/* Momo's Phonics Adventure — SVG art library (no emoji, all hand-drawn vectors) */

/* ---------- Icon library ---------- */
/* Every icon is drawn in a 0 0 100 100 viewBox, flat cartoon style. */
const ICONS = {

  sun: `
    <g stroke="#F5A623" stroke-width="6" stroke-linecap="round">
      <line x1="50" y1="4" x2="50" y2="16"/><line x1="50" y1="84" x2="50" y2="96"/>
      <line x1="4" y1="50" x2="16" y2="50"/><line x1="84" y1="50" x2="96" y2="50"/>
      <line x1="17" y1="17" x2="26" y2="26"/><line x1="74" y1="74" x2="83" y2="83"/>
      <line x1="83" y1="17" x2="74" y2="26"/><line x1="26" y1="74" x2="17" y2="83"/>
    </g>
    <circle cx="50" cy="50" r="24" fill="#FFC93C"/>
    <circle cx="42" cy="47" r="3.4" fill="#7A4E00"/><circle cx="58" cy="47" r="3.4" fill="#7A4E00"/>
    <path d="M42 57 Q50 64 58 57" stroke="#7A4E00" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,

  apple: `
    <path d="M50 30 Q52 18 62 14" stroke="#7B4B1E" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="66" cy="20" rx="11" ry="6.5" fill="#5FBB4E" transform="rotate(-25 66 20)"/>
    <path d="M50 34 C30 22 12 36 16 58 C19 76 34 90 50 88 C66 90 81 76 84 58 C88 36 70 22 50 34 Z" fill="#E8483F"/>
    <path d="M32 42 Q26 50 27 60" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".45"/>`,

  ten: `
    <rect x="10" y="18" width="80" height="64" rx="14" fill="#7C6CF6"/>
    <rect x="16" y="24" width="68" height="52" rx="10" fill="#FFFFFF"/>
    <text x="50" y="63" text-anchor="middle" font-family="inherit" font-size="34" font-weight="900" fill="#7C6CF6">10</text>`,

  pig: `
    <path d="M20 32 L12 14 L34 22 Z" fill="#F48FB1"/><path d="M80 32 L88 14 L66 22 Z" fill="#F48FB1"/>
    <circle cx="50" cy="54" r="34" fill="#F8A8C4"/>
    <circle cx="37" cy="46" r="4" fill="#5D3A45"/><circle cx="63" cy="46" r="4" fill="#5D3A45"/>
    <ellipse cx="50" cy="60" rx="14" ry="10" fill="#EF7FA8"/>
    <circle cx="45" cy="60" r="2.6" fill="#B04A73"/><circle cx="55" cy="60" r="2.6" fill="#B04A73"/>
    <path d="M34 72 Q50 80 66 72" stroke="#B04A73" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,

  igloo: `
    <path d="M12 74 A38 38 0 0 1 88 74 Z" fill="#EAF4FF" stroke="#B8D6F0" stroke-width="3"/>
    <path d="M26 74 A24 24 0 0 1 50 51 L50 74 Z" fill="#9CC4E8"/>
    <path d="M20 60 H80 M28 47 H72 M40 35 H60" stroke="#B8D6F0" stroke-width="3" fill="none"/>
    <rect x="8" y="72" width="84" height="8" rx="4" fill="#CFE6FA"/>`,

  nest: `
    <path d="M16 56 Q50 44 84 56 L78 76 Q50 88 22 76 Z" fill="#B07B3F"/>
    <path d="M20 58 Q50 70 80 58 M24 66 Q50 78 76 66" stroke="#8A5A24" stroke-width="3.5" fill="none"/>
    <ellipse cx="38" cy="48" rx="11" ry="13" fill="#FDF6E9"/>
    <ellipse cx="62" cy="48" rx="11" ry="13" fill="#FDF6E9"/>`,

  moon: `
    <path d="M62 6 A44 44 0 1 0 62 94 A52 52 0 0 1 62 6 Z" fill="#FFC93C" stroke="#F5A623" stroke-width="3"/>
    <path d="M38 42 Q42 46 38 50" stroke="#B8860B" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="34" r="4" fill="#FFE79C"/><circle cx="26" cy="62" r="5" fill="#FFE79C"/>
    <path d="M80 20 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="#F5A623"/>
    <path d="M84 70 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#F5A623"/>`,

  dog: `
    <ellipse cx="24" cy="42" rx="12" ry="20" fill="#8A5A2B"/>
    <ellipse cx="76" cy="42" rx="12" ry="20" fill="#8A5A2B"/>
    <circle cx="50" cy="52" r="32" fill="#C68A4B"/>
    <ellipse cx="50" cy="64" rx="18" ry="14" fill="#F3E1C7"/>
    <circle cx="38" cy="44" r="4.4" fill="#3D2A16"/><circle cx="62" cy="44" r="4.4" fill="#3D2A16"/>
    <ellipse cx="50" cy="58" rx="7" ry="5.4" fill="#3D2A16"/>
    <path d="M50 63 L50 70 M50 70 Q42 76 38 70 M50 70 Q58 76 62 70" stroke="#3D2A16" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M46 72 Q50 80 56 74" stroke="#E2707B" stroke-width="6" fill="none" stroke-linecap="round"/>`,

  grapes: `
    <path d="M50 22 Q52 10 62 6" stroke="#7B4B1E" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="63" cy="14" rx="10" ry="6" fill="#5FBB4E" transform="rotate(-20 63 14)"/>
    <circle cx="36" cy="34" r="12" fill="#8E5BC0"/><circle cx="64" cy="34" r="12" fill="#8E5BC0"/>
    <circle cx="50" cy="30" r="12" fill="#A06ED4"/>
    <circle cx="30" cy="56" r="12" fill="#A06ED4"/><circle cx="70" cy="56" r="12" fill="#A06ED4"/>
    <circle cx="50" cy="54" r="12" fill="#8E5BC0"/>
    <circle cx="40" cy="76" r="12" fill="#8E5BC0"/><circle cx="60" cy="76" r="12" fill="#A06ED4"/>
    <circle cx="45" cy="26" r="3" fill="#D9C2F0"/>`,

  octopus: `
    <path d="M22 52 Q22 14 50 14 Q78 14 78 52 L78 62 L22 62 Z" fill="#9C6ADE"/>
    <g stroke="#9C6ADE" stroke-width="9" fill="none" stroke-linecap="round">
      <path d="M28 60 Q26 80 14 84"/><path d="M42 62 Q42 82 34 90"/>
      <path d="M58 62 Q58 82 66 90"/><path d="M72 60 Q74 80 86 84"/>
    </g>
    <circle cx="38" cy="42" r="5" fill="#FFFFFF"/><circle cx="62" cy="42" r="5" fill="#FFFFFF"/>
    <circle cx="39" cy="43" r="2.6" fill="#3A2555"/><circle cx="61" cy="43" r="2.6" fill="#3A2555"/>
    <path d="M42 52 Q50 58 58 52" stroke="#3A2555" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  cat: `
    <path d="M22 36 L14 8 L40 22 Z" fill="#F5A25D"/><path d="M78 36 L86 8 L60 22 Z" fill="#F5A25D"/>
    <path d="M22 34 L18 16 L34 24 Z" fill="#E2707B"/><path d="M78 34 L82 16 L66 24 Z" fill="#E2707B"/>
    <circle cx="50" cy="54" r="33" fill="#F5A25D"/>
    <circle cx="37" cy="48" r="4.4" fill="#4A2E12"/><circle cx="63" cy="48" r="4.4" fill="#4A2E12"/>
    <path d="M46 58 L50 62 L54 58 Z" fill="#E2707B"/>
    <path d="M50 62 Q44 70 38 66 M50 62 Q56 70 62 66" stroke="#4A2E12" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke="#4A2E12" stroke-width="2.6" stroke-linecap="round">
      <line x1="12" y1="52" x2="30" y2="55"/><line x1="12" y1="62" x2="30" y2="61"/>
      <line x1="88" y1="52" x2="70" y2="55"/><line x1="88" y1="62" x2="70" y2="61"/>
    </g>`,

  kite: `
    <path d="M50 6 L82 42 L50 78 L18 42 Z" fill="#E8483F"/>
    <path d="M50 6 L82 42 L50 42 Z" fill="#FFC93C"/>
    <path d="M50 42 L50 78 L18 42 Z" fill="#4A90D9"/>
    <path d="M50 78 Q56 86 50 92 Q44 96 48 99" stroke="#7B4B1E" stroke-width="3" fill="none"/>
    <path d="M56 84 l6 -4 l0 8 Z" fill="#5FBB4E"/><path d="M46 94 l-7 -3 l1 8 Z" fill="#F48FB1"/>`,

  egg: `
    <path d="M50 8 C68 8 80 36 80 58 C80 78 67 92 50 92 C33 92 20 78 20 58 C20 36 32 8 50 8 Z" fill="#FDF6E9" stroke="#EAD9B8" stroke-width="3"/>
    <circle cx="40" cy="40" r="4" fill="#F2E3C4"/><circle cx="60" cy="56" r="5" fill="#F2E3C4"/>
    <circle cx="45" cy="70" r="3.4" fill="#F2E3C4"/>`,

  umbrella: `
    <path d="M50 10 C24 10 8 30 8 48 Q15 40 22 48 Q29 40 36 48 Q43 40 50 48 Q57 40 64 48 Q71 40 78 48 Q85 40 92 48 C92 30 76 10 50 10 Z" fill="#E8483F"/>
    <line x1="50" y1="14" x2="50" y2="76" stroke="#7B4B1E" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 76 Q50 90 40 90 Q32 90 32 82" stroke="#7B4B1E" stroke-width="5" fill="none" stroke-linecap="round"/>`,

  rainbow: `
    <path d="M14 78 A36 36 0 0 1 86 78" stroke="#E8483F" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M23 78 A27 27 0 0 1 77 78" stroke="#FFC93C" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M32 78 A18 18 0 0 1 68 78" stroke="#5FBB4E" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M41 78 A9 9 0 0 1 59 78" stroke="#4A90D9" stroke-width="9" fill="none" stroke-linecap="round"/>
    <ellipse cx="14" cy="80" rx="11" ry="8" fill="#FFFFFF" stroke="#DCE9F5" stroke-width="2"/>
    <ellipse cx="86" cy="80" rx="11" ry="8" fill="#FFFFFF" stroke="#DCE9F5" stroke-width="2"/>`,

  hat: `
    <ellipse cx="50" cy="68" rx="42" ry="12" fill="#D8483F"/>
    <path d="M26 66 Q26 22 50 22 Q74 22 74 66 Z" fill="#E8483F"/>
    <rect x="26" y="56" width="48" height="10" rx="5" fill="#FFC93C"/>`,

  ball: `
    <circle cx="50" cy="50" r="38" fill="#E8483F"/>
    <path d="M12 50 Q50 26 88 50" stroke="#FFFFFF" stroke-width="8" fill="none"/>
    <path d="M12 50 Q50 74 88 50" stroke="#FFC93C" stroke-width="8" fill="none"/>
    <circle cx="36" cy="32" r="7" fill="#FFFFFF" opacity=".55"/>`,

  fish: `
    <path d="M84 50 L64 34 L64 66 Z" fill="#F5A25D"/>
    <ellipse cx="40" cy="50" rx="30" ry="22" fill="#FF9F43"/>
    <path d="M40 30 Q46 50 40 70 M28 32 Q34 50 28 68" stroke="#E8842A" stroke-width="4" fill="none"/>
    <circle cx="22" cy="45" r="4.4" fill="#FFFFFF"/><circle cx="21" cy="45" r="2.4" fill="#4A2E12"/>
    <path d="M12 54 Q16 56 18 53" stroke="#4A2E12" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="66" cy="26" r="3.4" fill="#BFE3F5"/><circle cx="74" cy="18" r="2.6" fill="#BFE3F5"/>`,

  leaf: `
    <path d="M50 8 C82 20 88 62 56 88 C50 92 44 92 40 86 C16 56 24 20 50 8 Z" fill="#5FBB4E"/>
    <path d="M50 16 Q48 55 46 84" stroke="#3E8A31" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M48 36 Q58 34 64 28 M47 54 Q60 54 68 46 M46 70 Q56 72 62 68" stroke="#3E8A31" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  jam: `
    <rect x="24" y="26" width="52" height="62" rx="12" fill="#C43B4E"/>
    <rect x="20" y="14" width="60" height="16" rx="8" fill="#F5C24B"/>
    <rect x="30" y="46" width="40" height="24" rx="6" fill="#FDF6E9"/>
    <circle cx="42" cy="58" r="4" fill="#C43B4E"/><circle cx="56" cy="56" r="3" fill="#C43B4E"/>
    <path d="M50 60 Q54 64 58 61" stroke="#C43B4E" stroke-width="2.4" fill="none"/>`,

  van: `
    <path d="M10 62 L10 40 Q10 32 18 32 L58 32 L74 32 Q80 32 84 38 L90 48 L90 62 Q90 68 84 68 L16 68 Q10 68 10 62 Z" fill="#4A90D9"/>
    <rect x="18" y="38" width="18" height="14" rx="4" fill="#D6EBFA"/>
    <rect x="42" y="38" width="16" height="14" rx="4" fill="#D6EBFA"/>
    <path d="M66 38 L76 38 L83 50 L66 50 Z" fill="#D6EBFA"/>
    <circle cx="28" cy="70" r="10" fill="#33414F"/><circle cx="28" cy="70" r="4.4" fill="#AEB9C4"/>
    <circle cx="72" cy="70" r="10" fill="#33414F"/><circle cx="72" cy="70" r="4.4" fill="#AEB9C4"/>`,

  web: `
    <g stroke="#8A97A5" stroke-width="3" fill="none" stroke-linecap="round">
      <line x1="50" y1="6" x2="50" y2="94"/><line x1="6" y1="50" x2="94" y2="50"/>
      <line x1="19" y1="19" x2="81" y2="81"/><line x1="81" y1="19" x2="19" y2="81"/>
      <path d="M50 26 Q67 33 74 50 Q67 67 50 74 Q33 67 26 50 Q33 33 50 26 Z"/>
      <path d="M50 42 Q56 44 58 50 Q56 56 50 58 Q44 56 42 50 Q44 44 50 42 Z"/>
    </g>
    <circle cx="70" cy="66" r="7" fill="#4A3A50"/><circle cx="70" cy="58" r="5" fill="#4A3A50"/>
    <circle cx="68.5" cy="57" r="1.4" fill="#FFF"/><circle cx="72" cy="57" r="1.4" fill="#FFF"/>`,

  zebra: `
    <path d="M30 24 L22 6 L42 16 Z" fill="#FFFFFF" stroke="#B9C7D4" stroke-width="3"/>
    <path d="M70 24 L78 6 L58 16 Z" fill="#FFFFFF" stroke="#B9C7D4" stroke-width="3"/>
    <path d="M31 22 L26 11 L38 17 Z" fill="#33414F"/><path d="M69 22 L74 11 L62 17 Z" fill="#33414F"/>
    <circle cx="50" cy="50" r="32" fill="#FFFFFF" stroke="#B9C7D4" stroke-width="3"/>
    <path d="M38 20 Q50 14 62 20 L58 30 Q50 26 42 30 Z" fill="#33414F"/>
    <path d="M22 42 Q30 44 32 52 M78 42 Q70 44 68 52" stroke="#33414F" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="39" cy="48" r="4.4" fill="#33414F"/><circle cx="61" cy="48" r="4.4" fill="#33414F"/>
    <ellipse cx="50" cy="72" rx="17" ry="13" fill="#B9C7D4"/>
    <path d="M36 68 Q42 64 47 67 M64 68 Q58 64 53 67" stroke="#33414F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="44" cy="73" r="2.8" fill="#33414F"/><circle cx="56" cy="73" r="2.8" fill="#33414F"/>`,

  yoyo: `
    <path d="M50 46 Q30 20 54 6" stroke="#8A97A5" stroke-width="3" fill="none"/>
    <circle cx="50" cy="62" r="30" fill="#E8483F"/>
    <circle cx="50" cy="62" r="30" fill="none" stroke="#C4372F" stroke-width="3"/>
    <circle cx="50" cy="62" r="12" fill="#FDF6E9"/>
    <circle cx="50" cy="62" r="4.5" fill="#F5A623"/>
    <path d="M28 46 A30 30 0 0 1 40 36" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>`,

  fox: `
    <path d="M20 38 L10 8 L40 22 Z" fill="#FF8A3D"/><path d="M80 38 L90 8 L60 22 Z" fill="#FF8A3D"/>
    <path d="M21 34 L15 15 L33 24 Z" fill="#5D3A22"/><path d="M79 34 L85 15 L67 24 Z" fill="#5D3A22"/>
    <circle cx="50" cy="54" r="33" fill="#FF8A3D"/>
    <path d="M26 62 Q30 84 50 84 Q70 84 74 62 Q62 74 50 74 Q38 74 26 62 Z" fill="#FFF4E8"/>
    <circle cx="37" cy="48" r="4.6" fill="#4A2E12"/><circle cx="63" cy="48" r="4.6" fill="#4A2E12"/>
    <ellipse cx="50" cy="62" rx="6" ry="4.6" fill="#4A2E12"/>
    <path d="M42 70 Q50 76 58 70" stroke="#4A2E12" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  queen: `
    <path d="M24 34 L24 12 L36 24 L50 8 L64 24 L76 12 L76 34 Z" fill="#F5C24B"/>
    <circle cx="24" cy="10" r="4" fill="#E8483F"/><circle cx="50" cy="6" r="4" fill="#4A90D9"/><circle cx="76" cy="10" r="4" fill="#5FBB4E"/>
    <path d="M22 56 Q18 88 32 88 L68 88 Q82 88 78 56 Q74 40 50 40 Q26 40 22 56 Z" fill="#7B4B2A"/>
    <circle cx="50" cy="58" r="22" fill="#F2C9A0"/>
    <circle cx="42" cy="55" r="3.4" fill="#4A2E12"/><circle cx="58" cy="55" r="3.4" fill="#4A2E12"/>
    <path d="M44 66 Q50 71 56 66" stroke="#C4636F" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="36" cy="62" r="3.4" fill="#F7A8B0" opacity=".8"/><circle cx="64" cy="62" r="3.4" fill="#F7A8B0" opacity=".8"/>`,

  bus: `
    <rect x="8" y="24" width="84" height="46" rx="10" fill="#FFC93C"/>
    <rect x="8" y="52" width="84" height="8" fill="#E8483F"/>
    <rect x="16" y="32" width="16" height="14" rx="4" fill="#BFE3F5"/>
    <rect x="42" y="32" width="16" height="14" rx="4" fill="#BFE3F5"/>
    <rect x="68" y="32" width="16" height="14" rx="4" fill="#BFE3F5"/>
    <circle cx="28" cy="72" r="10" fill="#33414F"/><circle cx="28" cy="72" r="4.4" fill="#AEB9C4"/>
    <circle cx="72" cy="72" r="10" fill="#33414F"/><circle cx="72" cy="72" r="4.4" fill="#AEB9C4"/>`,

  cup: `
    <path d="M62 40 Q84 38 84 54 Q84 70 60 68" stroke="#4A90D9" stroke-width="7" fill="none"/>
    <path d="M20 34 L66 34 L62 80 Q61 88 52 88 L34 88 Q25 88 24 80 Z" fill="#4A90D9"/>
    <path d="M22 46 L64 46" stroke="#D6EBFA" stroke-width="6"/>
    <path d="M34 24 Q30 16 34 8 M50 24 Q46 16 50 8" stroke="#AEB9C4" stroke-width="4" fill="none" stroke-linecap="round"/>`,

  hen: `
    <path d="M42 20 Q40 6 50 8 Q48 14 54 12 Q52 18 58 18 L54 26 Z" fill="#E8483F"/>
    <circle cx="52" cy="38" r="16" fill="#FDF6E9"/>
    <path d="M66 36 L78 40 L66 44 Z" fill="#F5A623"/>
    <circle cx="57" cy="34" r="3" fill="#4A2E12"/>
    <path d="M24 42 Q10 46 12 60 Q14 78 36 82 L62 82 Q76 78 74 62 Q72 52 62 50 Q50 48 44 54 Q30 42 24 42 Z" fill="#F6EBDC"/>
    <path d="M30 58 Q42 54 48 62 Q42 72 30 68 Q26 63 30 58 Z" fill="#E4D3BC"/>
    <path d="M42 82 L42 92 M52 82 L52 92" stroke="#F5A623" stroke-width="4" stroke-linecap="round"/>`,

  bed: `
    <rect x="10" y="26" width="10" height="56" rx="4" fill="#8A5A2B"/>
    <rect x="80" y="42" width="10" height="40" rx="4" fill="#8A5A2B"/>
    <rect x="14" y="52" width="74" height="18" rx="6" fill="#FDF6E9"/>
    <path d="M40 52 L88 52 L88 70 L40 70 Q34 60 40 52 Z" fill="#4A90D9"/>
    <path d="M46 58 L82 58 M44 64 L82 64" stroke="#7FB3E8" stroke-width="3"/>
    <ellipse cx="27" cy="50" rx="12" ry="7" fill="#FFFFFF" stroke="#E3D8C4" stroke-width="2"/>
    <rect x="12" y="70" width="78" height="8" rx="4" fill="#A9743C"/>`,

  log: `
    <rect x="22" y="34" width="68" height="32" rx="12" fill="#A9743C"/>
    <ellipse cx="24" cy="50" rx="13" ry="17" fill="#D9B287"/>
    <ellipse cx="24" cy="50" rx="7" ry="10" fill="#B98D5C"/>
    <ellipse cx="24" cy="50" rx="3" ry="4.6" fill="#8A5A2B"/>
    <path d="M44 40 Q52 44 60 40 M56 58 Q66 62 76 58" stroke="#8A5A2B" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,

  pen: `
    <g transform="rotate(45 50 50)">
      <rect x="42" y="8" width="16" height="52" rx="6" fill="#4A90D9"/>
      <rect x="42" y="54" width="16" height="12" fill="#F5C24B"/>
      <path d="M42 66 L58 66 L50 84 Z" fill="#F2C9A0"/>
      <path d="M47 74 L50 84 L53 74 Z" fill="#33414F"/>
      <rect x="42" y="8" width="16" height="8" rx="4" fill="#33414F"/>
    </g>`,

  box: `
    <path d="M18 40 L50 28 L82 40 L50 52 Z" fill="#D9B287"/>
    <path d="M18 40 L50 52 L50 88 L18 74 Z" fill="#B98D5C"/>
    <path d="M82 40 L50 52 L50 88 L82 74 Z" fill="#A9743C"/>
    <path d="M18 40 L8 30 L40 20 L50 28 Z" fill="#C9A26E"/>
    <path d="M82 40 L92 30 L60 20 L50 28 Z" fill="#C9A26E"/>`,

  fan: `
    <path d="M50 62 L18 18 Q34 8 50 8 Q66 8 82 18 Z" fill="#F48FB1"/>
    <path d="M50 62 L30 24 M50 62 L50 10 M50 62 L70 24" stroke="#FFFFFF" stroke-width="3.4"/>
    <path d="M50 62 L38 30 Q50 24 62 30 Z" fill="#FDE3EE"/>
    <circle cx="50" cy="62" r="7" fill="#C4636F"/>
    <rect x="45" y="64" width="10" height="28" rx="5" fill="#C4636F"/>`,

  pup: `
    <ellipse cx="22" cy="48" rx="13" ry="22" fill="#5D3A22"/>
    <ellipse cx="78" cy="48" rx="13" ry="22" fill="#5D3A22"/>
    <circle cx="50" cy="52" r="30" fill="#E0B380"/>
    <circle cx="60" cy="42" r="10" fill="#8A5A2B" opacity=".55"/>
    <circle cx="39" cy="46" r="4.2" fill="#3D2A16"/><circle cx="61" cy="46" r="4.2" fill="#3D2A16"/>
    <ellipse cx="50" cy="58" rx="6" ry="5" fill="#3D2A16"/>
    <path d="M50 62 Q44 70 38 66 M50 62 Q56 70 62 66" stroke="#3D2A16" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M46 70 Q50 77 55 71" stroke="#E2707B" stroke-width="5" fill="none" stroke-linecap="round"/>`,

  chick: `
    <circle cx="50" cy="54" r="32" fill="#FFD54F"/>
    <path d="M42 20 Q46 12 50 20 Q54 12 58 20" stroke="#F5A623" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="39" cy="48" r="4.4" fill="#4A2E12"/><circle cx="61" cy="48" r="4.4" fill="#4A2E12"/>
    <path d="M44 58 L50 66 L56 58 Z" fill="#F5A623"/>
    <path d="M22 56 Q14 62 20 70 Q28 70 30 62" fill="#F5C24B"/>
    <path d="M78 56 Q86 62 80 70 Q72 70 70 62" fill="#F5C24B"/>
    <path d="M40 86 L40 94 M60 86 L60 94" stroke="#F5A623" stroke-width="4" stroke-linecap="round"/>`,

  wave: `
    <path d="M30 92 Q22 74 24 52 Q25 44 32 44 Q38 44 38 52 L38 40 Q38 32 45 32 Q52 32 52 40 L52 36 Q52 28 59 28 Q66 28 66 36 L66 42 Q66 36 72 36 Q78 36 78 44 Q78 66 70 80 Q62 94 46 94 Q36 94 30 92 Z" fill="#F2C9A0"/>
    <path d="M38 56 L38 64 M52 52 L52 62 M66 52 L66 60" stroke="#DBA97A" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 30 Q20 24 20 16 M22 40 Q30 36 32 26" stroke="#4A90D9" stroke-width="4" fill="none" stroke-linecap="round"/>`,

  heart: `
    <path d="M50 86 C22 62 10 44 20 28 C28 15 46 18 50 32 C54 18 72 15 80 28 C90 44 78 62 50 86 Z" fill="#E85D75"/>
    <path d="M30 34 Q26 40 28 46" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>`,

  cake: `
    <rect x="47" y="6" width="6" height="14" rx="3" fill="#4A90D9"/>
    <ellipse cx="50" cy="6" rx="4" ry="6" fill="#FFC93C"/>
    <path d="M22 46 Q22 36 32 36 L68 36 Q78 36 78 46 L78 56 L22 56 Z" fill="#F48FB1"/>
    <path d="M22 50 Q28 58 34 50 Q40 58 46 50 Q52 58 58 50 Q64 58 70 50 Q76 58 78 52 L78 56 L22 56 Z" fill="#FDE3EE"/>
    <rect x="14" y="56" width="72" height="26" rx="8" fill="#A9743C"/>
    <path d="M20 66 L80 66" stroke="#8A5A2B" stroke-width="4"/>
    <rect x="10" y="80" width="80" height="8" rx="4" fill="#D9B287"/>`,

  house: `
    <path d="M50 8 L92 44 L82 44 L82 88 L18 88 L18 44 L8 44 Z" fill="#F6EBDC"/>
    <path d="M50 8 L92 44 L82 44 L50 18 L18 44 L8 44 Z" fill="#E8483F"/>
    <rect x="42" y="58" width="18" height="30" rx="4" fill="#8A5A2B"/>
    <circle cx="56" cy="74" r="2.4" fill="#F5C24B"/>
    <rect x="22" y="52" width="14" height="14" rx="3" fill="#BFE3F5" stroke="#8A97A5" stroke-width="2"/>
    <rect x="66" y="52" width="14" height="14" rx="3" fill="#BFE3F5" stroke="#8A97A5" stroke-width="2"/>`,

  book: `
    <path d="M50 24 Q30 12 10 18 L10 78 Q30 72 50 84 Z" fill="#7FB3E8"/>
    <path d="M50 24 Q70 12 90 18 L90 78 Q70 72 50 84 Z" fill="#4A90D9"/>
    <path d="M50 24 Q34 15 18 18 L18 72 Q34 69 50 78 Z" fill="#FDF6E9"/>
    <path d="M50 24 Q66 15 82 18 L82 72 Q66 69 50 78 Z" fill="#FFFFFF"/>
    <path d="M24 30 Q36 28 44 32 M24 42 Q36 40 44 44 M24 54 Q36 52 44 56 M56 32 Q64 28 76 30 M56 44 Q64 40 76 42" stroke="#C9D6E4" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  cloud: `
    <path d="M28 74 Q10 74 10 58 Q10 44 24 44 Q26 28 42 26 Q56 24 62 36 Q78 32 84 46 Q92 48 92 60 Q92 74 76 74 Z" fill="#FFFFFF" stroke="#DCE9F5" stroke-width="3"/>
    <circle cx="38" cy="56" r="3" fill="#8FA8C0"/><circle cx="56" cy="56" r="3" fill="#8FA8C0"/>
    <path d="M42 64 Q47 68 52 64" stroke="#8FA8C0" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,

  star: `
    <path d="M50 6 L61 37 L94 38 L68 58 L77 91 L50 71 L23 91 L32 58 L6 38 L39 37 Z" fill="#FFC93C" stroke="#F5A623" stroke-width="3" stroke-linejoin="round"/>`,

  speaker: `
    <path d="M12 38 L28 38 L48 20 L48 80 L28 62 L12 62 Z" fill="#4A90D9"/>
    <path d="M58 36 Q66 50 58 64 M68 26 Q80 50 68 74" stroke="#4A90D9" stroke-width="6" fill="none" stroke-linecap="round"/>`,

  lock: `
    <path d="M32 44 L32 32 Q32 14 50 14 Q68 14 68 32 L68 44" stroke="#8A97A5" stroke-width="9" fill="none" stroke-linecap="round"/>
    <rect x="22" y="42" width="56" height="46" rx="12" fill="#AEB9C4"/>
    <circle cx="50" cy="62" r="7" fill="#5B6773"/>
    <rect x="47" y="64" width="6" height="12" rx="3" fill="#5B6773"/>`,

  check: `
    <circle cx="50" cy="50" r="42" fill="#5FBB4E"/>
    <path d="M30 52 L44 66 L72 36" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  cross: `
    <circle cx="50" cy="50" r="42" fill="#E8483F"/>
    <path d="M35 35 L65 65 M65 35 L35 65" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round"/>`,

  mic: `
    <rect x="38" y="10" width="24" height="44" rx="12" fill="#E85D75"/>
    <path d="M26 44 Q26 68 50 68 Q74 68 74 44" stroke="#33414F" stroke-width="6" fill="none" stroke-linecap="round"/>
    <line x1="50" y1="68" x2="50" y2="84" stroke="#33414F" stroke-width="6" stroke-linecap="round"/>
    <line x1="36" y1="88" x2="64" y2="88" stroke="#33414F" stroke-width="6" stroke-linecap="round"/>
    <path d="M44 20 L56 20 M44 30 L56 30 M44 40 L56 40" stroke="#F7A8B0" stroke-width="3" stroke-linecap="round"/>`,

  trophy: `
    <path d="M28 14 L72 14 L70 44 Q66 62 50 62 Q34 62 30 44 Z" fill="#F5C24B"/>
    <path d="M28 20 L14 20 Q12 38 30 42 M72 20 L86 20 Q88 38 70 42" stroke="#F5A623" stroke-width="6" fill="none"/>
    <rect x="44" y="62" width="12" height="12" fill="#E0A72E"/>
    <rect x="32" y="74" width="36" height="12" rx="4" fill="#A9743C"/>
    <path d="M50 24 L54 34 L64 34 L56 40 L59 50 L50 44 L41 50 L44 40 L36 34 L46 34 Z" fill="#FFFFFF" opacity=".85"/>`,

  crown: `
    <path d="M14 74 L10 28 L32 46 L50 18 L68 46 L90 28 L86 74 Z" fill="#F5C24B"/>
    <rect x="14" y="74" width="72" height="12" rx="5" fill="#E0A72E"/>
    <circle cx="10" cy="26" r="5" fill="#E8483F"/><circle cx="50" cy="14" r="5" fill="#4A90D9"/><circle cx="90" cy="26" r="5" fill="#5FBB4E"/>
    <circle cx="50" cy="58" r="7" fill="#E8483F"/><circle cx="28" cy="60" r="5" fill="#4A90D9"/><circle cx="72" cy="60" r="5" fill="#5FBB4E"/>`,

  pencil: `
    <g transform="rotate(45 50 50)">
      <rect x="41" y="4" width="18" height="10" rx="4" fill="#F48FB1"/>
      <rect x="41" y="14" width="18" height="6" fill="#AEB9C4"/>
      <rect x="41" y="20" width="18" height="48" fill="#FFC93C"/>
      <path d="M41 20 L47 20 L47 68 L41 68 Z" fill="#F5A623"/>
      <path d="M41 68 L59 68 L50 88 Z" fill="#F2C9A0"/>
      <path d="M46.5 76 L50 88 L53.5 76 Z" fill="#33414F"/>
    </g>`,

  chat: `
    <path d="M50 12 Q88 12 88 42 Q88 68 56 70 L36 86 L40 68 Q12 64 12 42 Q12 12 50 12 Z" fill="#5FBB4E"/>
    <circle cx="34" cy="42" r="5" fill="#FFFFFF"/><circle cx="50" cy="42" r="5" fill="#FFFFFF"/><circle cx="66" cy="42" r="5" fill="#FFFFFF"/>`,

  ear: `
    <path d="M32 40 Q32 12 56 12 Q80 12 80 38 Q80 54 68 64 Q60 70 58 80 Q56 92 44 92 Q32 92 32 78" stroke="#F2C9A0" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M46 42 Q46 28 58 28 Q68 28 68 40 Q68 48 60 52" stroke="#DBA97A" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M10 30 Q16 38 10 46 M18 22 Q28 36 18 52" stroke="#4A90D9" stroke-width="4" fill="none" stroke-linecap="round"/>`,

  balloon: `
    <path d="M50 74 Q52 84 46 92" stroke="#8A97A5" stroke-width="3" fill="none"/>
    <path d="M50 8 Q78 8 78 40 Q78 62 50 72 Q22 62 22 40 Q22 8 50 8 Z" fill="#E85D75"/>
    <path d="M44 70 L56 70 L50 78 Z" fill="#C4636F"/>
    <path d="M32 24 Q28 32 30 40" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>`,

  bug: `
    <circle cx="50" cy="34" r="14" fill="#33414F"/>
    <path d="M40 24 Q32 14 26 12 M60 24 Q68 14 74 12" stroke="#33414F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="62" rx="26" ry="26" fill="#E8483F"/>
    <line x1="50" y1="38" x2="50" y2="88" stroke="#33414F" stroke-width="4"/>
    <circle cx="38" cy="54" r="5" fill="#33414F"/><circle cx="62" cy="54" r="5" fill="#33414F"/>
    <circle cx="40" cy="72" r="5" fill="#33414F"/><circle cx="60" cy="72" r="5" fill="#33414F"/>`,

  mop: `
    <line x1="50" y1="6" x2="50" y2="56" stroke="#A9743C" stroke-width="7" stroke-linecap="round"/>
    <rect x="28" y="52" width="44" height="12" rx="6" fill="#4A90D9"/>
    <g stroke="#D9D2C0" stroke-width="6" stroke-linecap="round">
      <path d="M34 64 Q32 80 28 88"/><path d="M44 64 Q44 82 42 92"/>
      <path d="M56 64 Q56 82 58 92"/><path d="M66 64 Q68 80 72 88"/>
    </g>`,

  /* ---- daily-practice additions ---- */
  bird: `
    <path d="M16 58 L2 44 L5 60 L2 74 Z" fill="#3FA9DA"/>
    <ellipse cx="46" cy="58" rx="30" ry="25" fill="#5BC0EB"/>
    <circle cx="64" cy="40" r="17" fill="#5BC0EB"/>
    <path d="M79 38 L94 44 L79 50 Z" fill="#F5A623"/>
    <path d="M30 52 Q46 46 58 60 Q44 72 30 64 Z" fill="#3FA9DA"/>
    <circle cx="68" cy="36" r="4.4" fill="#22303D"/><circle cx="69.5" cy="34.5" r="1.6" fill="#FFF"/>
    <path d="M42 82 L42 93 M56 82 L56 93" stroke="#F5A623" stroke-width="4.5" stroke-linecap="round"/>`,

  milk: `
    <path d="M30 36 L70 36 L70 88 Q70 93 65 93 L35 93 Q30 93 30 88 Z" fill="#FFFFFF" stroke="#CBD9E5" stroke-width="3"/>
    <path d="M30 36 L50 12 L70 36 Z" fill="#EAF4FF" stroke="#CBD9E5" stroke-width="3"/>
    <rect x="37" y="52" width="26" height="26" rx="5" fill="#4A90D9"/>
    <path d="M50 58 Q56 66 50 72 Q44 66 50 58 Z" fill="#FFFFFF"/>
    <path d="M40 22 L50 12 L60 22" fill="none" stroke="#CBD9E5" stroke-width="3"/>`,

  bread: `
    <path d="M14 56 Q14 26 50 26 Q86 26 86 56 L86 76 Q86 84 78 84 L22 84 Q14 84 14 76 Z" fill="#D9A05B"/>
    <path d="M22 56 Q22 36 50 36 Q78 36 78 56 L78 72 L22 72 Z" fill="#F0C98A"/>
    <path d="M32 34 Q34 24 44 28 M52 30 Q56 20 66 26" stroke="#C08A50" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="38" cy="56" r="4" fill="#E3B375"/><circle cx="58" cy="62" r="3.4" fill="#E3B375"/>`,

  door: `
    <rect x="22" y="8" width="56" height="86" rx="7" fill="#A9743C"/>
    <rect x="29" y="15" width="42" height="72" rx="5" fill="#C89660"/>
    <rect x="35" y="22" width="30" height="24" rx="4" fill="#B4834C"/>
    <rect x="35" y="56" width="30" height="24" rx="4" fill="#B4834C"/>
    <circle cx="64" cy="52" r="5" fill="#F5C24B"/>`,

  hand: `
    <path d="M32 92 Q22 74 24 54 Q25 46 32 46 Q38 46 38 54 L38 34 Q38 26 45 26 Q52 26 52 34 L52 30 Q52 22 59 22 Q66 22 66 30 L66 38 Q66 32 72 32 Q79 32 79 40 Q79 66 70 80 Q62 93 48 93 Z" fill="#F2C9A0" stroke="#DBA97A" stroke-width="3"/>
    <path d="M38 56 L38 66 M52 50 L52 62 M66 50 L66 60" stroke="#DBA97A" stroke-width="3" stroke-linecap="round"/>`,

  doll: `
    <path d="M26 40 Q26 8 50 8 Q74 8 74 40 Q74 46 68 46 L32 46 Q26 46 26 40 Z" fill="#8C5A3C"/>
    <circle cx="50" cy="44" r="24" fill="#F7D9BE"/>
    <circle cx="42" cy="42" r="3.6" fill="#3D2A16"/><circle cx="58" cy="42" r="3.6" fill="#3D2A16"/>
    <path d="M44 52 Q50 57 56 52" stroke="#D4737E" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="48" r="4" fill="#F7A8B0" opacity=".8"/><circle cx="66" cy="48" r="4" fill="#F7A8B0" opacity=".8"/>
    <path d="M32 70 Q32 62 50 62 Q68 62 68 70 L72 92 L28 92 Z" fill="#F48FB1"/>
    <path d="M28 72 L14 82 M72 72 L86 82" stroke="#F7D9BE" stroke-width="9" stroke-linecap="round"/>`,

  car: `
    <path d="M12 66 L14 52 Q15 46 22 46 L30 46 L40 30 Q42 26 48 26 L64 26 Q70 26 73 31 L82 46 L86 48 Q90 50 90 56 L90 66 Q90 70 86 70 L16 70 Q12 70 12 66 Z" fill="#E8483F"/>
    <path d="M44 32 L58 32 L64 44 L40 44 Z" fill="#D6EBFA"/>
    <path d="M33 44 L41 33 L38 44 Z" fill="#D6EBFA"/>
    <circle cx="30" cy="72" r="11" fill="#33414F"/><circle cx="30" cy="72" r="4.6" fill="#AEB9C4"/>
    <circle cx="72" cy="72" r="11" fill="#33414F"/><circle cx="72" cy="72" r="4.6" fill="#AEB9C4"/>
    <circle cx="86" cy="56" r="4" fill="#FFE79C"/>`,

  rain: `
    <path d="M28 56 Q10 56 10 42 Q10 28 24 28 Q28 12 44 12 Q58 12 62 24 Q78 22 82 34 Q92 36 92 46 Q92 56 78 56 Z" fill="#B9C7D4"/>
    <g stroke="#4A90D9" stroke-width="7" stroke-linecap="round">
      <line x1="28" y1="68" x2="23" y2="82"/><line x1="48" y1="66" x2="43" y2="84"/>
      <line x1="68" y1="68" x2="63" y2="82"/><line x1="38" y1="82" x2="35" y2="92"/>
      <line x1="60" y1="84" x2="57" y2="93"/>
    </g>`,

  tree: `
    <rect x="43" y="58" width="14" height="36" rx="5" fill="#8A5A2B"/>
    <circle cx="50" cy="34" r="26" fill="#5FBB4E"/>
    <circle cx="28" cy="48" r="18" fill="#6DC95B"/>
    <circle cx="72" cy="48" r="18" fill="#6DC95B"/>
    <circle cx="50" cy="52" r="18" fill="#54AC44"/>
    <circle cx="38" cy="30" r="5" fill="#84D673"/><circle cx="62" cy="42" r="4" fill="#84D673"/>`,
};

/* Body parts: one friendly face, with the named part highlighted */
const FACE_BASE = `
  <circle cx="50" cy="52" r="40" fill="#F7D9BE"/>
  <path d="M22 30 Q26 8 50 8 Q74 8 78 30 Q64 20 50 22 Q36 20 22 30 Z" fill="#5D4032"/>`;
const FACE_EARS = `<ellipse cx="12" cy="54" rx="8" ry="11" fill="#F2C9A0"/><ellipse cx="88" cy="54" rx="8" ry="11" fill="#F2C9A0"/>`;
const FACE_EYES = `<circle cx="37" cy="48" r="5" fill="#33261A"/><circle cx="63" cy="48" r="5" fill="#33261A"/>`;
const FACE_NOSE = `<path d="M50 52 Q46 62 52 63" stroke="#DBA97A" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
const FACE_MOUTH = `<path d="M38 72 Q50 82 62 72" stroke="#C4636F" stroke-width="4" fill="none" stroke-linecap="round"/>`;
const RING = (cx, cy, rx, ry) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#E8483F" stroke-width="4" stroke-dasharray="7 5"/>`;

ICONS.eye = FACE_EARS + FACE_BASE + FACE_NOSE + FACE_MOUTH +
  `<circle cx="37" cy="48" r="9" fill="#FFF" stroke="#33261A" stroke-width="2"/><circle cx="37" cy="48" r="5" fill="#33261A"/>` +
  `<circle cx="63" cy="48" r="9" fill="#FFF" stroke="#33261A" stroke-width="2"/><circle cx="63" cy="48" r="5" fill="#33261A"/>` +
  RING(50, 48, 34, 15);
ICONS.ear2 = FACE_BASE + FACE_EYES + FACE_NOSE + FACE_MOUTH +
  `<ellipse cx="12" cy="54" rx="10" ry="14" fill="#F2C9A0" stroke="#DBA97A" stroke-width="2"/>` +
  `<ellipse cx="88" cy="54" rx="10" ry="14" fill="#F2C9A0" stroke="#DBA97A" stroke-width="2"/>` +
  RING(12, 54, 15, 19) + RING(88, 54, 15, 19);
ICONS.nose = FACE_EARS + FACE_BASE + FACE_EYES + FACE_MOUTH +
  `<path d="M50 46 Q44 62 52 64" stroke="#C98F63" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  RING(50, 56, 15, 15);
ICONS.mouth = FACE_EARS + FACE_BASE + FACE_EYES + FACE_NOSE +
  `<path d="M34 68 Q50 88 66 68 Z" fill="#8C4A5A"/><path d="M41 74 Q50 82 59 74 Z" fill="#F27E9B"/>` +
  RING(50, 74, 22, 15);

/* A paint blob in any color — used for the colors day */
function colorSVG(hex, cls) {
  return `<svg class="${cls || 'pic'}" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 10 C74 10 90 28 90 50 C90 74 72 90 50 90 C26 90 10 72 10 50 C10 26 28 10 50 10 Z" fill="${hex}"/>
    <path d="M30 30 Q22 40 24 52" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>
  </svg>`;
}

/* Word-image color plates: soft circle behind each icon */
function iconSVG(name, cls) {
  const body = ICONS[name] || ICONS.star;
  return `<svg class="${cls || 'pic'}" viewBox="0 0 100 100" aria-hidden="true">${body}</svg>`;
}
function iconInBubble(name, bg) {
  const body = ICONS[name] || ICONS.star;
  return `<svg class="pic" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="${bg || '#FFF4E0'}"/>
    <g transform="translate(14,14) scale(.72)">${body}</g></svg>`;
}

/* ---------- Mimi the cat — the game's hero ---------- */
/* moods: idle | happy | cheer | talk | think | oops */
const CAT = { fur: '#9DB8CE', dark: '#7E9DB8', cream: '#FFF6E8', pink: '#F7B8C4', ink: '#33323F' };
function catSVG(mood) {
  mood = mood || 'idle';
  const mouths = {
    idle:  `<path d="M100 112 Q94 120 88 116 M100 112 Q106 120 112 116" stroke="${CAT.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    happy: `<path d="M86 114 Q100 130 114 114 Z" fill="#8C4A5A"/><path d="M92 122 Q100 130 108 122 Z" fill="#F27E9B"/>`,
    cheer: `<path d="M84 112 Q100 134 116 112 Z" fill="#8C4A5A"/><path d="M90 122 Q100 132 110 122 Z" fill="#F27E9B"/>`,
    talk:  `<g class="mouth-a"><ellipse cx="100" cy="118" rx="10" ry="8" fill="#8C4A5A"/><ellipse cx="100" cy="121" rx="6" ry="4" fill="#F27E9B"/></g>
            <g class="mouth-b"><path d="M100 112 Q94 120 88 116 M100 112 Q106 120 112 116" stroke="${CAT.ink}" stroke-width="3.6" fill="none" stroke-linecap="round"/></g>`,
    think: `<path d="M94 118 Q100 115 106 118" stroke="${CAT.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    oops:  `<ellipse cx="100" cy="116" rx="6" ry="7" fill="#8C4A5A"/>`,
  };
  const eyes = {
    idle:  `<circle cx="80" cy="88" r="7" fill="${CAT.ink}"/><circle cx="120" cy="88" r="7" fill="${CAT.ink}"/>
            <circle cx="82.5" cy="85.5" r="2.4" fill="#FFF"/><circle cx="122.5" cy="85.5" r="2.4" fill="#FFF"/>`,
    happy: `<path d="M72 88 Q80 80 88 88" stroke="${CAT.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M112 88 Q120 80 128 88" stroke="${CAT.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    cheer: `<path d="M72 88 Q80 78 88 88" stroke="${CAT.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M112 88 Q120 78 128 88" stroke="${CAT.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    talk:  `<circle cx="80" cy="88" r="7" fill="${CAT.ink}"/><circle cx="120" cy="88" r="7" fill="${CAT.ink}"/>
            <circle cx="82.5" cy="85.5" r="2.4" fill="#FFF"/><circle cx="122.5" cy="85.5" r="2.4" fill="#FFF"/>`,
    think: `<circle cx="80" cy="86" r="6" fill="${CAT.ink}"/><circle cx="120" cy="86" r="6" fill="${CAT.ink}"/>
            <path d="M68 74 Q78 68 88 72 M132 74 Q122 68 112 72" stroke="${CAT.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    oops:  `<circle cx="80" cy="88" r="8" fill="${CAT.ink}"/><circle cx="120" cy="88" r="8" fill="${CAT.ink}"/>
            <circle cx="83" cy="85" r="3" fill="#FFF"/><circle cx="123" cy="85" r="3" fill="#FFF"/>`,
  };
  const cheerArms = mood === 'cheer' ? `
    <g class="m-armL"><ellipse cx="52" cy="120" rx="10" ry="20" fill="${CAT.fur}" transform="rotate(35 52 120)"/>
      <circle cx="42" cy="104" r="9" fill="${CAT.cream}"/></g>
    <g class="m-armR"><ellipse cx="148" cy="120" rx="10" ry="20" fill="${CAT.fur}" transform="rotate(-35 148 120)"/>
      <circle cx="158" cy="104" r="9" fill="${CAT.cream}"/></g>
    <g fill="#FFC93C">
      <path d="M30 60 l4 9 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1 Z"/>
      <path d="M164 54 l4 9 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1 Z"/>
      <path d="M172 120 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1 Z"/>
    </g>` : '';
  const thinkPaw = mood === 'think' ? `
    <circle cx="128" cy="126" r="10" fill="${CAT.cream}" stroke="${CAT.dark}" stroke-width="2"/>
    <circle cx="164" cy="58" r="4" fill="#B9C7D4"/><circle cx="174" cy="44" r="6" fill="#B9C7D4"/>` : '';

  return `<svg class="hero mood-${mood}" viewBox="0 0 200 200" aria-label="Mimi the cat">
    <g class="m-tail">
      <path d="M140 158 Q186 156 184 112 Q183 94 170 88 Q178 116 148 132 Z" fill="${CAT.fur}"/>
      <path d="M170 88 Q178 100 174 112 L158 106 Q168 98 170 88 Z" fill="${CAT.dark}"/>
      <path d="M164 124 Q158 132 148 134 L150 122 Q158 122 164 124 Z" fill="${CAT.dark}"/>
    </g>
    <ellipse cx="100" cy="158" rx="46" ry="34" fill="${CAT.fur}"/>
    <ellipse cx="100" cy="164" rx="28" ry="24" fill="${CAT.cream}"/>
    ${cheerArms}
    <ellipse cx="76" cy="188" rx="13" ry="8" fill="${CAT.dark}"/>
    <ellipse cx="124" cy="188" rx="13" ry="8" fill="${CAT.dark}"/>
    <g class="m-head">
      <path d="M56 64 L46 14 L94 34 Z" fill="${CAT.fur}"/>
      <path d="M144 64 L154 14 L106 34 Z" fill="${CAT.fur}"/>
      <path d="M60 54 L54 24 L84 37 Z" fill="${CAT.pink}"/>
      <path d="M140 54 L146 24 L116 37 Z" fill="${CAT.pink}"/>
      <circle cx="100" cy="90" r="52" fill="${CAT.fur}"/>
      <path d="M88 42 L90 54 M100 40 L100 53 M112 42 L110 54" stroke="${CAT.dark}" stroke-width="5" stroke-linecap="round"/>
      <path d="M60 102 Q66 136 100 136 Q134 136 140 102 Q122 122 100 122 Q78 122 60 102 Z" fill="${CAT.cream}"/>
      <ellipse cx="64" cy="102" rx="9" ry="6" fill="#F9C2CC" opacity=".85"/>
      <ellipse cx="136" cy="102" rx="9" ry="6" fill="#F9C2CC" opacity=".85"/>
      <g class="m-eyes">${eyes[mood] || eyes.idle}</g>
      <path d="M93 102 L107 102 L100 111 Z" fill="#F27E9B"/>
      <g stroke="${CAT.dark}" stroke-width="2.6" stroke-linecap="round">
        <line x1="34" y1="98" x2="60" y2="102"/><line x1="34" y1="110" x2="60" y2="110"/>
        <line x1="166" y1="98" x2="140" y2="102"/><line x1="166" y1="110" x2="140" y2="110"/>
      </g>
      <g class="m-mouth">${mouths[mood] || mouths.idle}</g>
    </g>
    ${thinkPaw}
  </svg>`;
}
/* legacy alias so any old call sites keep working */
const momoSVG = catSVG;

/* ---------- Story scene backgrounds ---------- */
const SCENE_BG = {
  meadow: `
    <rect x="0" y="0" width="320" height="200" fill="#CFEBFA"/>
    <circle cx="272" cy="36" r="22" fill="#FFC93C"/>
    <g stroke="#F5A623" stroke-width="4" stroke-linecap="round">
      <line x1="272" y1="4" x2="272" y2="10"/><line x1="244" y1="14" x2="248" y2="19"/><line x1="300" y1="14" x2="296" y2="19"/>
    </g>
    <ellipse cx="70" cy="40" rx="26" ry="12" fill="#FFFFFF"/>
    <ellipse cx="150" cy="26" rx="20" ry="9" fill="#FFFFFF"/>
    <ellipse cx="60" cy="215" rx="180" ry="80" fill="#9FD97C"/>
    <ellipse cx="290" cy="220" rx="160" ry="75" fill="#8ACB68"/>
    <path d="M40 160 l3 -10 3 10 M60 168 l3 -10 3 10 M256 158 l3 -10 3 10" stroke="#5FA84B" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="150" r="4" fill="#F48FB1"/><circle cx="288" cy="150" r="4" fill="#F5C24B"/>`,
  sky: `
    <rect x="0" y="0" width="320" height="200" fill="#BFE3F5"/>
    <circle cx="50" cy="40" r="20" fill="#FFC93C"/>
    <ellipse cx="120" cy="60" rx="30" ry="13" fill="#FFFFFF"/>
    <ellipse cx="230" cy="36" rx="36" ry="15" fill="#FFFFFF"/>
    <ellipse cx="290" cy="90" rx="26" ry="11" fill="#FFFFFF"/>
    <ellipse cx="160" cy="230" rx="230" ry="60" fill="#9FD97C"/>`,
  road: `
    <rect x="0" y="0" width="320" height="200" fill="#CFEBFA"/>
    <circle cx="284" cy="32" r="20" fill="#FFC93C"/>
    <ellipse cx="90" cy="34" rx="26" ry="11" fill="#FFFFFF"/>
    <ellipse cx="40" cy="190" rx="120" ry="60" fill="#9FD97C"/>
    <ellipse cx="290" cy="195" rx="130" ry="60" fill="#9FD97C"/>
    <path d="M0 178 Q160 150 320 178 L320 200 L0 200 Z" fill="#8A97A5"/>
    <path d="M20 184 L50 181 M90 178 L120 176 M170 175 L200 176 M250 179 L280 182" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>`,
  night: `
    <rect x="0" y="0" width="320" height="200" fill="#3D4A6B"/>
    <path d="M262 22 A26 26 0 1 0 262 74 A20 20 0 1 1 262 22 Z" fill="#FFD54F"/>
    <g fill="#FFF">
      <circle cx="40" cy="30" r="3"/><circle cx="90" cy="56" r="2.4"/><circle cx="150" cy="24" r="2.6"/>
      <circle cx="200" cy="60" r="2"/><circle cx="60" cy="80" r="2"/>
    </g>
    <ellipse cx="160" cy="230" rx="230" ry="62" fill="#2E5C3F"/>`,
};

function sceneSVG(scene) {
  const bg = SCENE_BG[scene.bg] || SCENE_BG.meadow;
  let items = '';
  (scene.items || []).forEach(it => {
    if (it.hero || it.momo) {
      const s = it.s || 0.55;
      items += `<g transform="translate(${it.x},${it.y}) scale(${s})">${
        catSVG(it.mood || 'happy').replace(/<\/?svg[^>]*>/g, '')}</g>`;
    } else {
      const body = ICONS[it.icon] || ICONS.star;
      const s = it.s || 0.7;
      const flip = it.flip ? ` scale(-1,1) translate(-100,0)` : '';
      items += `<g transform="translate(${it.x},${it.y}) scale(${s})${flip} ${it.r ? `rotate(${it.r} 50 50)` : ''}">${body}</g>`;
    }
  });
  return `<svg class="scene" viewBox="0 0 320 200" aria-hidden="true">${bg}${items}</svg>`;
}
