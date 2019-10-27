const HOST = "https://www.bing.com";

const transformCountryCode = function(code) {
  if(code === 'en') return 'en-US';
  return `${code}-${code.toUpperCase()}`;
};

exports.url = function(options) {
  if (options.speak) {
    const country_code = transformCountryCode(options.to);
    const text = encodeURI(options.translated_text);

    return `${HOST}/translator/api/language/Speak?locale=${country_code}&gender=female&media=audio/mp3&text=${text}`;
  }
  return `${HOST}/translator/api/Translate/TranslateArray?from=${options.from}&to=${options.to}`;
};
