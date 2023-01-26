 // 파일을 모듈처럼 가져옴
import React from "react";
import './App.css';
import Title from "./components/Title";
import MainCard from "./components/Maincard";
import fetchCat from './components/FetchCat';
import Form from './components/Form';

const jsonLocalStorage = {
  setItem: (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
   },
  getItem: (key) => {
  return JSON.parse(localStorage.getItem(key));
    },
  };

   
    function CatItem(props) {
      return (
        <li>
          <img src={props.img} style={{ width: "150px" }} />
        </li>
      );
    }
    function Favorites({ favorites }) {
      
      if(favorites.length === 0){ //조건부렌더링
        return <div> 하트를 눌러 고양이사진을 저장해봐요!</div>;
      }
      
      return (
        <ul className="favorites">
          {favorites.map((cat) => (
            <CatItem img={cat} key={cat} />
          ))}
        </ul>
      );
    }

    const App = () => {
      const CAT1 =
        "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
      const CAT2 =
        "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
      const CAT3 =
        "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";

       //로컬스토리지에 저장되는값은 무조건 String 값이기 때문에 카운트 수를 Number로 변환
      const [counter, setCounter] = React.useState(()=>{
         return jsonLocalStorage.getItem('counter');
      })
      const [mainCat, setMainCat] = React.useState(CAT1);
      const [favorites, setFavorites] = React.useState(()=>{
         return jsonLocalStorage.getItem('favorites') || [];
      } ); // favorites 값이 null일때  맵에  값이 없어서 초기 배열을  정의


      
      const alreadyFavorite= favorites.includes(mainCat)
       //앱 진입시 바로 API를 호출해서 MAIN CAT을 갈아치워주기.
        async function setInitialCat(){
          const newCat = await fetchCat('FirstCat');
          setMainCat(newCat);
        }
        
        React.useEffect(()=>{ //UI가 업데이트 될때 항상 실행되지만, 어떠한 상태가업데이트 될때만 실행되는 함수
          setInitialCat();

        },[])

      async function updateMainCat(value) {
        const newCat =await fetchCat(value); //fetch API 사용 사용자 input값을 받아온다.
        
        setMainCat(newCat); // API값을 변수로 받아서 값을 넣어준다.
        
        setCounter((prev) => {
          const nextCounter =prev +1;
          jsonLocalStorage.setItem("counter",nextCounter);
          return nextCounter ;
        })
         //로컬스토리지에 count 저장
      }

      function handleHeartClick() {
        const nextFavorites =[...favorites, mainCat];
        setFavorites(nextFavorites);
        jsonLocalStorage.setItem('favorites',nextFavorites);
      }
      // 삼항연산자 사용
      const counterTitle = counter === null? "": counter+"번째";
      return (
        <div>
          <Title>{counterTitle} 고양이 가라사대</Title>
          <Form updateMainCat={updateMainCat} />
          <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
          <Favorites favorites={favorites} />
        </div>
      );
    };

export default App;
