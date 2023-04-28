<script>
  import { i18n } from "../../functions";
  import { lang } from "../../stores"

  let langText;

  const langs = { ru: '🇷🇺', en: '🇺🇸', ua: '🇺🇦' }

  $: langText = `${i18n('lang')} ${langs[$lang]}`;

  function toggleLang(){
    let langArr = Object.keys(langs);
    const index = langArr.indexOf($lang)
    $lang = langArr[index === langArr.length - 1 ? 0 : index+1]
  }
</script>

<button on:click={toggleLang}>{langText}</button>
