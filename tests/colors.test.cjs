const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const read=file=>readFileSync(join(__dirname,'..',file),'utf8');
const declarations=css=>Object.fromEntries([...css.matchAll(/(--[\w-]+):([^;]+);/g)].map(match=>[match[1],match[2].trim()]));
const palette=declarations(read('colors.css'));
const css=read('styles.css');
const light=declarations(css.match(/:root\{([^}]+)\}/)[1]);
const dark=declarations(css.match(/:root\[data-theme="dark"\]\{([^}]+)\}/)[1]);
const clamp=value=>Math.max(0,Math.min(1,value));
const gamma=value=>value<=0.0031308?12.92*value:1.055*Math.pow(value,1/2.4)-0.055;
const linear=value=>value<=0.04045?value/12.92:Math.pow((value+0.055)/1.055,2.4);

test('active themes have no green accents, including secondary states',()=>{
  for(const theme of [light,dark]){
    assert.match(theme['--primary'],/--color-sky-/);
    for(const value of Object.values(theme))assert.doesNotMatch(value,/--color-(green|emerald|teal|lime|olive)-/);
    assert.match(theme['--mint'],/--color-blue-/);
    assert.match(theme['--mint-ink'],/--color-blue-/);
    assert.match(theme['--status-bg'],/--color-blue-/);
    assert.match(theme['--chip-bg'],/--color-blue-/);
  }
});

test('light links are darker while dark secondary accents stay softened',()=>{
  assert.equal(light['--link'],'var(--color-sky-800)');
  assert.equal(light['--primary'],'var(--color-sky-700)');
  assert.equal(dark['--primary'],'var(--color-sky-300)');
  for(const key of ['link','blue-label','blue-ink','blue-control-line','practice-ink']){
    assert.ok(dark['--'+key].includes('color-mix'));
    assert.ok(dark['--'+key].includes('--color-mist-'));
  }
});

test('hover fills are neutral in both themes without adding a competing nav underline',()=>{
  for(const theme of [light,dark])assert.match(theme['--hover-surface'],/^var\(--color-mist-/);
  assert.doesNotMatch(css,/\.nav button:not\(\.active\):hover/);
  assert.ok(css.includes('.nav button:hover,.nav button:focus-visible{color:var(--ink)'));
});

test('the complete Tailwind v4.3 palette includes every shade of all 26 families',()=>{
  const families=['red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose','slate','gray','zinc','neutral','stone','taupe','mauve','mist','olive'];
  for(const family of families)for(const shade of [50,100,200,300,400,500,600,700,800,900,950]){
    assert.ok(palette['--color-'+family+'-'+shade],family+' '+shade+' missing');
  }
  assert.equal(Object.keys(palette).length,288);
});

function rgb(value,tokens){
  if(value.startsWith('var('))return rgb(tokens[value.slice(4,-1)],tokens);
  if(value.startsWith('#')){
    let hex=value.slice(1);if(hex.length===3)hex=[...hex].map(x=>x+x).join('');
    return [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255);
  }
  if(value.startsWith('color-mix')){
    const match=value.match(/color-mix\(in srgb,(var\([^)]+\)) (\d+)%,(var\([^)]+\))\)/);
    assert.ok(match,'Unsupported contrast mix: '+value);
    const a=rgb(match[1],tokens),b=rgb(match[3],tokens),weight=Number(match[2])/100;
    return a.map((channel,i)=>channel*weight+b[i]*(1-weight));
  }
  const match=value.match(/oklch\(([\d.]+)% ([\d.]+) ([\d.]+|none)\)/);
  assert.ok(match,'Unsupported color: '+value);
  const L=Number(match[1])/100,C=Number(match[2]),h=(Number(match[3])||0)*Math.PI/180;
  const a=C*Math.cos(h),b=C*Math.sin(h);
  const l=Math.pow(L+0.3963377774*a+0.2158037573*b,3);
  const m=Math.pow(L-0.1055613458*a-0.0638541728*b,3);
  const s=Math.pow(L-0.0894841775*a-1.291485548*b,3);
  return [
    4.0767416621*l-3.3077115913*m+0.2309699292*s,
    -1.2684380046*l+2.6097574011*m-0.3413193965*s,
    -0.0041960863*l-0.7034186147*m+1.707614701*s
  ].map(channel=>clamp(gamma(channel)));
}
function contrast(foreground,background,tokens){
  const luminance=value=>rgb(value,tokens).map(linear).reduce((sum,c,i)=>sum+c*[0.2126,0.7152,0.0722][i],0);
  const a=luminance(foreground),b=luminance(background);
  return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
}

test('light and dark expose the same semantic tokens and resolve every palette reference',()=>{
  assert.deepEqual(Object.keys(dark).sort(),Object.keys(light).sort());
  const tokens={...palette,...light,...dark};
  for(const match of css.matchAll(/var\((--[\w-]+)\)/g))assert.ok(tokens[match[1]],'Missing '+match[1]);
});

for(const [name,theme] of Object.entries({light,dark})){
  test(name+' text and controls meet contrast targets',()=>{
    const tokens={...palette,...theme};
    const pairs=[
      ['ink','page'],['muted','page'],['muted','surface'],['primary','page'],
      ['on-primary','primary'],['blue-label','blue-soft'],['blue-ink','blue-soft'],
      ['reward-muted','reward-bg'],['seal-ink','seal-bg'],['stamp-ink','reward-bg'],
      ['stamp-fill-ink','gold'],['gold-ink','gold-soft'],['mint-ink','mint'],
      ['caution-ink','caution-bg'],['upset-ink','upset-bg'],['error','page'],
      ['toast-ink','toast-bg'],['nav-muted','page'],['reward-link','reward-bg'],
      ['practice-ink','practice-icon'],['link','page'],['link','hover-surface']
    ];
    for(const [fg,bg] of pairs){
      const ratio=contrast(theme['--'+fg],theme['--'+bg],tokens);
      assert.ok(ratio>=4.5,fg+' on '+bg+': '+ratio.toFixed(2));
    }
    for(const [fg,bg] of [['input-line','surface'],['checkbox-line','page'],['accent','page'],['blue-control-line','blue-soft']]){
      const ratio=contrast(theme['--'+fg],theme['--'+bg],tokens);
      assert.ok(ratio>=3,fg+' control: '+ratio.toFixed(2));
    }
  });
}

test('palette is loaded locally, cached offline, and browser chrome matches neutral surfaces',()=>{
  assert.ok(read('index.html').includes('href="colors.css?v='));
  assert.ok(read('sw.js').includes("'./colors.css?v="));
  const manifest=JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.theme_color,light['--browser-theme']);
  assert.equal(manifest.background_color,light['--browser-theme']);
  assert.ok(read('index.html').includes(dark['--browser-theme']));
});
