const fetchCat = async (text) => { // 오픈 API를  JS Fetch API를 사용해 값을 받아온다. 이때 비동기방식으로 값을 받아온후 사용할 함수에 VALUE값을 넣어준다.
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
     return `${OPEN_API_DOMAIN}/${responseJson.url}`;
      };


      export default fetchCat;