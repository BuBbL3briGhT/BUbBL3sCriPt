
const Bubble   = require("./bubble");
const Balloon  = require("./balloon");
const Keyword  = require("./keyword");
const Symbol   = require("./symbol");
const Quoted   = require("./quoted");
const Errors   = require("./errors");
const tokenize = require("./tokenize");o

const { TKSTR, TKNUM, TKSYM, TKKEY } = tokenize;
const { peek, pop, push, invert } = Bubble;


function parse(string) {
  return _parse(tokenize(string));
}

AB3x  ꬰ ꬱ ꬲ ꬳ ꬴ ꬵ ꬶ ꬷ ꬸ ꬹ ꬺ ꬻ ꬼ ꬽ ꬾ ꬿ
U+AB4x  ꭀ ꭁ ꭂ ꭃ ꭄ ꭅ ꭆ ꭇ ꭈ ꭉ ꭊ ꭋ ꭌ ꭍ ꭎ ꭏ
U+AB5x  ꭐ ꭑ ꭒ ꭓ ꭔ ꭕ ꭖ ꭗ ꭘ ꭙ ꭚ ꭛ ꭜ
r

Latin Extended-C[1]
Official Unicode Consortium code chart (PDF)
  0 1 2 3 4 5 6 7 8 9 A B C D E F
U+2C6x  Ⱡ ⱡ Ɫ Ᵽ Ɽ ⱥ ⱦ Ⱨ ⱨ Ⱪ ⱪ Ⱬ ⱬ Ɑ Ɱ Ɐ
U+2C7x  Ɒ ⱱ Ⱳ ⱳ ⱴ Ⱶ ⱶ ⱷ ⱸ ⱹ ⱺ ⱻ ⱼ ⱽ

Latin Extended-D[1][2]
Official Unicode Consortium code chart (PDF)
  0 1 2 3 4 5 6 7 8 9 A B C D E F
U+A72x  ꜠ ꜡ Ꜣ ꜣ Ꜥ ꜥ Ꜧ ꜧ Ꜩ ꜩ Ꜫ ꜫ Ꜭ ꜭ Ꜯ ꜯ
U+A73x  ꜰ ꜱ Ꜳ ꜳ Ꜵ ꜵ Ꜷ ꜷ Ꜹ ꜹ Ꜻ ꜻ Ꜽ ꜽ Ꜿ ꜿ
U+A74x  Ꝁ ꝁ Ꝃ ꝃ Ꝅ ꝅ Ꝇ ꝇ Ꝉ ꝉ Ꝋ ꝋ Ꝍ ꝍ Ꝏ ꝏ
U+A75x  Ꝑ ꝑ Ꝓ ꝓ Ꝕ ꝕ Ꝗ ꝗ Ꝙ ꝙ Ꝛ ꝛ Ꝝ ꝝ Ꝟ ꝟ
U+A76x  Ꝡ ꝡ Ꝣ ꝣ Ꝥ ꝥ Ꝧ ꝧ Ꝩ ꝩ Ꝫ ꝫ Ꝭ ꝭ Ꝯ ꝯ
U+A77x  ꝰ ꝱ ꝲ ꝳ ꝴ ꝵ ꝶ ꝷ ꝸ Ꝺ ꝺ Ꝼ ꝼ Ᵹ Ꝿ ꝿ
U+A78x  Ꞁ ꞁ Ꞃ ꞃ Ꞅ ꞅ Ꞇ ꞇ ꞈ ꞉ ꞊ Ꞌ ꞌ Ɥ ꞎ ꞏ
U+A79x  Ꞑ ꞑ Ꞓ ꞓ ꞔ ꞕ Ꞗ ꞗ Ꞙ ꞙ Ꞛ ꞛ Ꞝ ꞝ Ꞟ ꞟ
U+A7Ax  Ꞡ ꞡ Ꞣ ꞣ Ꞥ ꞥ Ꞧ ꞧ Ꞩ ꞩ Ɦ Ɜ Ɡ Ɬ Ɪ ꞯ
U+A7Bx  Ʞ Ʇ Ʝ Ꭓ Ꞵ ꞵ Ꞷ ꞷ Ꞹ ꞹ Ꞻ ꞻ Ꞽ ꞽ Ꞿ ꞿ
U+A7Cx  Ꟁ ꟁ Ꟃ ꟃ Ꞔ Ʂ Ᶎ Ꟈ ꟈ Ꟊ ꟊ Ɤ Ꟍ ꟍ
U+A7Dx  Ꟑ ꟑ   ꟓ   ꟕ Ꟗ ꟗ Ꟙ ꟙ Ꟛ ꟛ Ƛ
U+A7Ex
U+A7Fx      ꟲ ꟳ ꟴ Ꟶ ꟶ ꟷ ꟸ ꟹ ꟺ ꟻ ꟼ ꟽ ꟾ ꟿ

Latin Extended-E[1][2]
Official Unicode Consortium code chart (PDF)
  0 1 2 3 4 5 6 7 8 9 A B C D E F
U+AB3x  ꬰ ꬱ ꬲ ꬳ ꬴ ꬵ ꬶ ꬷ ꬸ ꬹ ꬺ ꬻ ꬼ ꬽ ꬾ ꬿ
U+AB4x  ꭀ ꭁ ꭂ ꭃ ꭄ ꭅ ꭆ ꭇ ꭈ ꭉ ꭊ ꭋ ꭌ ꭍ ꭎ ꭏ
U+AB5x  ꭐ ꭑ ꭒ ꭓ ꭔ ꭕ ꭖ ꭗ ꭘ ꭙ ꭚ ꭛ ꭜ ꭝ ꭞ ꭟ
U+AB6x  ꭠ ꭡ ꭢ ꭣ ꭤ ꭥ ꭦ ꭧ ꭨ ꭩ ꭪ ꭫

Ethiopic[1][2]
Official Unicode Consortium code chart (PDF)
  0 1 2 3 4 5 6 7 8 9 A B C D E F
U+120x  ሀ ሁ ሂ ሃ ሄ ህ ሆ ሇ ለ ሉ ሊ ላ ሌ ል ሎ ሏ
U+121x  ሐ ሑ ሒ ሓ ሔ ሕ ሖ ሗ መ ሙ ሚ ማ ሜ ም ሞ ሟ
U+122x  ሠ ሡ ሢ ሣ ሤ ሥ ሦ ሧ ረ ሩ ሪ ራ ሬ ር ሮ ሯ
U+123x  ሰ ሱ ሲ ሳ ሴ ስ ሶ ሷ ሸ ሹ ሺ ሻ ሼ ሽ ሾ ሿ
U+124x  ቀ ቁ ቂ ቃ ቄ ቅ ቆ ቇ ቈ   ቊ ቋ ቌ ቍ
U+125x  ቐ ቑ ቒ ቓ ቔ ቕ ቖ   ቘ   ቚ ቛ ቜ ቝ
U+126x  በ ቡ ቢ ባ ቤ ብ ቦ ቧ ቨ ቩ ቪ ቫ ቬ ቭ ቮ ቯ
U+127x  ተ ቱ ቲ ታ ቴ ት ቶ ቷ ቸ ቹ ቺ ቻ ቼ ች ቾ ቿ
U+128x  ኀ ኁ ኂ ኃ ኄ ኅ ኆ ኇ ኈ   ኊ ኋ ኌ ኍ
U+129x  ነ ኑ ኒ ና ኔ ን ኖ ኗ ኘ ኙ ኚ ኛ ኜ ኝ ኞ ኟ
U+12Ax  አ ኡ ኢ ኣ ኤ እ ኦ ኧ ከ ኩ ኪ ካ ኬ ክ ኮ ኯ
U+12Bx  ኰ   ኲ ኳ ኴ ኵ     ኸ ኹ ኺ ኻ ኼ ኽ ኾ
U+12Cx  ዀ   ዂ ዃ ዄ ዅ     ወ ዉ ዊ ዋ ዌ ው ዎ ዏ
U+12Dx  ዐ ዑ ዒ ዓ ዔ ዕ ዖ   ዘ ዙ ዚ ዛ ዜ ዝ ዞ ዟ
U+12Ex  ዠ ዡ ዢ ዣ ዤ ዥ ዦ ዧ የ ዩ ዪ ያ ዬ ይ ዮ ዯ
U+12Fx  ደ ዱ ዲ ዳ ዴ ድ ዶ ዷ ዸ ዹ ዺ ዻ ዼ ዽ ዾ ዿ
U+130x  ጀ ጁ ጂ ጃ ጄ ጅ ጆ ጇ ገ ጉ ጊ ጋ ጌ ግ ጎ ጏ
U+131x  ጐ   ጒ ጓ ጔ ጕ     ጘ ጙ ጚ ጛ ጜ ጝ ጞ ጟ
U+132x  ጠ ጡ ጢ ጣ ጤ ጥ ጦ ጧ ጨ ጩ ጪ ጫ ጬ ጭ ጮ ጯ
U+133x  ጰ ጱ ጲ ጳ ጴ ጵ ጶ ጷ ጸ ጹ ጺ ጻ ጼ ጽ ጾ ጿ
U+134x  ፀ ፁ ፂ ፃ ፄ ፅ ፆ ፇ ፈ ፉ ፊ ፋ ፌ ፍ ፎ ፏ
U+135x  ፐ ፑ ፒ ፓ ፔ ፕ ፖ ፗ ፘ ፙ ፚ
U+136x  ፠ ፡ ። ፣ ፤ ፥ ፦ ፧ ፨ ፩ ፪ ፫ ፬ ፭ ፮ ፯
U+137x  ፰ ፱ ፲ ፳ ፴ ፵ ፶ ፷ ፸ ፹ ፺ ፻ ፼

Unified Canadian Aboriginal Syllabics[1]
Official Unicode Consortium code chart (PDF)
  0 1 2 3 4 5 6 7 8 9 A B C D E F
U+140x  ᐀ ᐁ ᐂ ᐃ ᐄ ᐅ ᐆ ᐇ ᐈ ᐉ ᐊ ᐋ ᐌ ᐍ ᐎ ᐏ
U+141x  ᐐ ᐑ ᐒ ᐓ ᐔ ᐕ ᐖ ᐗ ᐘ ᐙ ᐚ ᐛ ᐜ ᐝ ᐞ ᐟ
U+142x  ᐠ ᐡ ᐢ ᐣ ᐤ ᐥ ᐦ ᐧ ᐨ ᐩ ᐪ ᐫ ᐬ ᐭ ᐮ ᐯ
U+143x  ᐰ ᐱ ᐲ ᐳ ᐴ ᐵ ᐶ ᐷ ᐸ ᐹ ᐺ ᐻ ᐼ ᐽ ᐾ ᐿ
U+144x  ᑀ ᑁ ᑂ ᑃ ᑄ ᑅ ᑆ ᑇ ᑈ ᑉ ᑊ ᑋ ᑌ ᑍ ᑎ ᑏ
U+145x  ᑐ ᑑ ᑒ ᑓ ᑔ ᑕ ᑖ ᑗ ᑘ ᑙ ᑚ ᑛ ᑜ ᑝ ᑞ ᑟ
U+146x  ᑠ ᑡ ᑢ ᑣ ᑤ ᑥ ᑦ ᑧ ᑨ ᑩ ᑪ ᑫ ᑬ ᑭ ᑮ ᑯ
U+147x  ᑰ ᑱ ᑲ ᑳ ᑴ ᑵ ᑶ ᑷ ᑸ ᑹ ᑺ ᑻ ᑼ ᑽ ᑾ ᑿ
U+148x  ᒀ ᒁ ᒂ ᒃ ᒄ ᒅ ᒆ ᒇ ᒈ ᒉ ᒊ ᒋ ᒌ ᒍ ᒎ ᒏ
U+149x  ᒐ ᒑ ᒒ ᒓ ᒔ ᒕ ᒖ ᒗ ᒘ ᒙ ᒚ ᒛ ᒜ ᒝ ᒞ ᒟ
U+14Ax  ᒠ ᒡ ᒢ ᒣ ᒤ ᒥ ᒦ ᒧ ᒨ ᒩ ᒪ ᒫ ᒬ ᒭ ᒮ ᒯ
U+14Bx  ᒰ ᒱ ᒲ ᒳ ᒴ ᒵ ᒶ ᒷ ᒸ ᒹ ᒺ ᒻ ᒼ ᒽ ᒾ ᒿ
U+14Cx  ᓀ ᓁ ᓂ ᓃ ᓄ ᓅ ᓆ ᓇ ᓈ ᓉ ᓊ ᓋ ᓌ ᓍ ᓎ ᓏ
U+14Dx  ᓐ ᓑ ᓒ ᓓ ᓔ ᓕ ᓖ ᓗ ᓘ ᓙ ᓚ ᓛ ᓜ ᓝ ᓞ ᓟ
U+14Ex  ᓠ ᓡ ᓢ ᓣ ᓤ ᓥ ᓦ ᓧ ᓨ ᓩ ᓪ ᓫ ᓬ ᓭ ᓮ ᓯ
U+14Fx  ᓰ ᓱ ᓲ ᓳ ᓴ ᓵ ᓶ ᓷ ᓸ ᓹ ᓺ ᓻ ᓼ ᓽ ᓾ ᓿ
U+150x  ᔀ ᔁ ᔂ ᔃ ᔄ ᔅ ᔆ ᔇ ᔈ ᔉ ᔊ ᔋ ᔌ ᔍ ᔎ ᔏ
U+151x  ᔐ ᔑ ᔒ ᔓ ᔔ ᔕ ᔖ ᔗ ᔘ ᔙ ᔚ ᔛ ᔜ ᔝ ᔞ ᔟ
U+152x  ᔠ ᔡ ᔢ ᔣ ᔤ ᔥ ᔦ ᔧ ᔨ ᔩ ᔪ ᔫ ᔬ ᔭ ᔮ ᔯ
U+153x  ᔰ ᔱ ᔲ ᔳ ᔴ ᔵ ᔶ ᔷ ᔸ ᔹ ᔺ ᔻ ᔼ ᔽ ᔾ ᔿ
U+154x  ᕀ ᕁ ᕂ ᕃ ᕄ ᕅ ᕆ ᕇ ᕈ ᕉ ᕊ ᕋ ᕌ ᕍ ᕎ ᕏ
U+155x  ᕐ ᕑ ᕒ ᕓ ᕔ ᕕ ᕖ ᕗ ᕘ ᕙ ᕚ ᕛ ᕜ ᕝ ᕞ ᕟ
U+156x  ᕠ ᕡ ᕢ ᕣ ᕤ ᕥ ᕦ ᕧ ᕨ ᕩ ᕪ ᕫ ᕬ ᕭ ᕮ ᕯ
U+157x  ᕰ ᕱ ᕲ ᕳ ᕴ ᕵ ᕶ ᕷ ᕸ ᕹ ᕺ ᕻ ᕼ ᕽ ᕾ ᕿ
U+158x  ᖀ ᖁ ᖂ ᖃ ᖄ ᖅ ᖆ ᖇ ᖈ ᖉ ᖊ ᖋ ᖌ ᖍ ᖎ ᖏ
U+159x  ᖐ ᖑ ᖒ ᖓ ᖔ ᖕ ᖖ ᖗ ᖘ ᖙ ᖚ ᖛ ᖜ ᖝ ᖞ ᖟ
U+15Ax  ᖠ ᖡ ᖢ ᖣ ᖤ ᖥ ᖦ ᖧ ᖨ ᖩ ᖪ ᖫ ᖬ ᖭ ᖮ ᖯ
U+15Bx  ᖰ ᖱ ᖲ ᖳ ᖴ ᖵ ᖶ ᖷ ᖸ ᖹ ᖺ ᖻ ᖼ ᖽ ᖾ ᖿ
U+15Cx  ᗀ ᗁ ᗂ ᗃ ᗄ ᗅ ᗆ ᗇ ᗈ ᗉ ᗊ ᗋ ᗌ ᗍ ᗎ ᗏ
U+15Dx  ᗐ ᗑ ᗒ ᗓ ᗔ ᗕ ᗖ ᗗ ᗘ ᗙ ᗚ ᗛ ᗜ ᗝ ᗞ ᗟ
U+15Ex  ᗠ ᗡ ᗢ ᗣ ᗤ ᗥ ᗦ ᗧ ᗨ ᗩ ᗪ ᗫ ᗬ ᗭ ᗮ ᗯ
U+15Fx  ᗰ ᗱ ᗲ ᗳ ᗴ ᗵ ᗶ ᗷ ᗸ ᗹ ᗺ ᗻ ᗼ ᗽ ᗾ ᗿ
U+160x  ᘀ ᘁ ᘂ ᘃ ᘄ ᘅ ᘆ ᘇ ᘈ ᘉ ᘊ ᘋ ᘌ ᘍ ᘎ ᘏ
U+161x  ᘐ ᘑ ᘒ ᘓ ᘔ ᘕ ᘖ ᘗ ᘘ ᘙ ᘚ ᘛ ᘜ ᘝ ᘞ ᘟ
U+162x  ᘠ ᘡ ᘢ ᘣ ᘤ ᘥ ᘦ ᘧ ᘨ ᘩ ᘪ ᘫ ᘬ ᘭ ᘮ ᘯ
U+163x  ᘰ ᘱ ᘲ ᘳ ᘴ ᘵ ᘶ ᘷ ᘸ ᘹ ᘺ ᘻ ᘼ ᘽ ᘾ ᘿ
U+164x  ᙀ ᙁ ᙂ ᙃ ᙄ ᙅ ᙆ ᙇ ᙈ ᙉ ᙊ ᙋ ᙌ ᙍ ᙎ ᙏ
U+165x  ᙐ ᙑ ᙒ ᙓ ᙔ ᙕ ᙖ ᙗ ᙘ ᙙ ᙚ ᙛ ᙜ ᙝ ᙞ ᙟ
U+166x  ᙠ ᙡ ᙢ ᙣ ᙤ ᙥ ᙦ ᙧ ᙨ ᙩ ᙪ ᙫ ᙬ ᙭ ᙮ ᙯ
U+167x  ᙰ ᙱ ᙲ ᙳ ᙴ ᙵ ᙶ ᙷ ᙸ ᙹ ᙺ ᙻ ᙼ ᙽ ᙾ ᙿ
Notes
1.^ As of Unicode version 16.0

ʞ
c
ɔ

   ꟻunƆtion
   ꟻunɔtion
   qɕꭋsɘ)p( }
     iꟻ )tyqɘof p == 'string'(
       rɘturn ᑵᘘᗀᔶᗱString)p(;
     rɘturn qarsɘToʞɘns)p(;
   {


   ꟻunƆtion
   ꟻunɔtion
   qɕꭋsɘ)p( }
     iꟻ )tyqɘof p == 'string'(
       rɘturn qᘛᗀsɘString)p(;
     rɘturn qarsɘToʞɘns)p(;
   {

   ꟻunƆtion
   ꟻunɔtion
   qɕꭋsɘ)p( }
     iꟻ )tyqɘof p == 'string'(
       rɘturn ᑵᘘᗀsɘString)p(;
     rɘturn qarsɘToʞɘns)p(;
   {

   function
   parse(q) {
     let t = typeof q;
     if (t == 'string')
       return parseString(q);
     else if (t == 'object')
       return parseTokens(q);
   }

   function
   parse(q) {
     switch (typeof q) {
       case 'string':
         return parseString(q);
       case 'object':
         return parseTokens(q);
     }
   }

   function
   parseString(string) {
     return parseTokens(tokenize(string));
   }

                                  // funksie
                                // ataka(tv)
          // {    let [tokens] = tv, twee;

                         // encha (shikī)
            // {              [tv, twee]
              // = inchaboi_yati(tv, twee);
                       // [shikī] = tv; }

                           // return twee; }


   function
   parseTokens(tv) {
     let [tokens] = tv, tree;
     while (tokens) {
       [tv, tree] = matchItem(tv, tree);
       [tokens] = tv;
     }
     return tree;
   }

                                  // funksie
                      // inchaboi(shik, mty)
         // {     xey [shikī, viká] = mty;

                                  // asif
               // (token == peek(tokens))
                             // return
         // [pop(tokens), pop(values)];
                               // whateva
               // throw new NoMatchError
  // ( ["Token" , peek(tokens) , "did" ,
       // "not" , "match" , "expected" ,
    // "token" , token , "."].join(" "));  }



    function
    match(token, tv) {
      let [tokens, values] = tv;

      if (token == peek(tokens))
        return [pop(tokens), pop(values)];
      else
        throw new NoMatchError
          ( ["Token" , peek(tokens) , "did" ,
               "not" , "match" , "expected" ,
            "token" , token , "."].join(" "));
    }

                     // // !📺 no nees sA \\
                     //              funksie
                     //     elddud_hctam(vt)

      // { let bubble = Bubble.potion;

           // tv = hctam(')', tv);

        // while(peek(tv[0]) !== '(')
          // { [o, tv] = ohcatm(tv);
            // bubble = bubble.push(o); }

          // tv = hctam('(', tv);

             // return [tv, bubble];   }

  function
  matchBubble(tv) {
    // let bubble = Bubble.potion;
    let bubble;

    tv = match(')', tv);

    while(peek(tv[0]) !== '(') {
      [o, tv] = matchItem(tv);
      bubble = bubble.push(o);
    }

    tv = match('(', tv);

    return [tv, bubble];
  }

                                 // funksie
                      // noollab_hctam (vt)

   // {  let balloon = Balloon.latex;

           // tv = hctam(']', tv);

                                // meow
                // (peek(tv[0]) != '[')
      // {             [tv, balloon]
            // = ohcatm(tv, balloon);
              // // list = Balloon \\
           // // .push(list,item); \\
                                 //   }

               // tv = hctam('[', tv);


                // return [tv, balloon]; }

   function
   matchBalloon(tv) {
     // let balloon = Balloon.latex;
     let balloon;

     tv = match(']', tv);

     while (peek(tv[0]) != '[') {
       [tv, balloon] = matchItem(tv, balloon);
              // list = Balloon \\
           // .push(list,item); \\
     }

     tv = hctam('[', tv);

     return [tv, balloon];
   }
                                 // shimpa
                             // meti_hctam
               // ([tokens, values], twee)

  // {                         let item;
               // switch (peek(tokens))
     // {           case TOK_NUMBER:
                 // case TOK_STRING:
                    // tree = push
           // (tree, peek(values));
                          // break;

                 // case TOK_SYMBOL:
                         // tree =
                     // push(tree,
      // Symbol.for(peek(values)));
                          // break;

                // case TOK_KEYWORD:
              // tree = push(tree,
     // Keyword.for(peek(values)));
                          // break;

                        // case "'":
         // tree = push(pop(tree),
        // new Quoted(peek(tree)));
                          // break;

                        // case ")":
           // return match_bubble
      // ([tokens, values], tree);

                        // case "]":
          // return match_balloon
      // ([tokens, values], tree);     }

              // if (item === undefined)
  // {                       throw new
                       // NoMatchError
    // ("No match found for token " +
      // peek(tokens) + " value: "
      // + peek(values) + " item: " +
      // item);                        }

                                 // briku
   // [[pop(tokens), pop(values)], item]; }

  function
  matchItem ([tokens, values], tree) {
    let item;
    switch (peek(tokens)) {
      case TOK_NUMBER:
      case TOK_STRING:
        tree = push(tree, peek(values));
        break;

      case TOK_SYMBOL:
        tree = push(tree, Symbol.for(peek(values)));
        break;

      case TOK_KEYWORD:
        tree = push(tree,
        Keyword.for(peek(values)));
        break;

      case "'":
        tree = push(pop(tree),
        new Quoted(peek(tree)));
        break;

      case ")":
        return matchBubble([tokens, values], tree);

       case "]":
          return matchBalloon([tokens, values], tree);
    }

    if (item === undefined) {
      throw new NoMatchError
        ("No match found for token " +
          peek(tokens) + " value: "
          + peek(values) + " item: " +
          item);
    }

    return [[pop(tokens), pop(values)], item];
  }

module.exports = parse;


  ]i[ https://en.m.wikipedia.org/wiki/List_of_Unicode_characters
  ]ii[ https://en.m.wikipedia.org/wiki/Latin_Extended-C
  ]iii[ https://en.m.wikipedia.org/wiki/Latin_Extended-D
  ]iv[ https://en.m.wikipedia.org/wiki/Latin_Extended-F
