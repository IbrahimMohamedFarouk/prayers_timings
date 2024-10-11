import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import MediaCard from "./Prayer";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useEffect,useState } from "react";
import axios from "axios";
import moment from "moment";
import { AllCitiesAvilable, prayers } from "../Data/Data";
import "moment/dist/locale/ar-dz"

moment.locale("ar-dz")

export default function MainContainer() {
  const [selectedCity,setSelectedCity]=useState({
    id:1,
    displaycity:"القاهرة",
    apiCity:"Cairo"
  })
  const [timings,setTimings]=useState({})
  const [today,setToday]=useState("")
  const [nextPrayer,setNextPrayer]=useState(0)
  const getTimings=async ()=>{
    const response =await axios.get(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiCity}`);
    setTimings(response.data.data.timings)
  }
  useEffect(()=>{
    getTimings()
    const today=moment()
    setToday(today.format("dddd MMMM Do YYYY | h:mm"))
  },[selectedCity])
  useEffect((()=>{
    const interval =setInterval(()=>{
      countDownTimer()
    },1000)
    return ()=>{
      clearInterval(interval)
    }
  }),[])
  const countDownTimer=()=>{
    const timingNow=moment()
    let indexOfPrayer=1
    if(timingNow.isAfter(moment(timings["Fajr"],"hh:mm"))&&timingNow.isBefore(moment(timings["Sunrise"],"hh:mm"))){
      indexOfPrayer = 0 
    }else if(timingNow.isAfter(moment(timings["Sunrise"],"hh:mm"))&&timingNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
      indexOfPrayer = 1 
    }else if(timingNow.isAfter(moment(timings["Dhuhr"],"hh:mm"))&&timingNow.isBefore(moment(timings["Asr"],"hh:mm"))){
      indexOfPrayer = 2 
    }else if(timingNow.isAfter(moment(timings["Asr"],"hh:mm"))&&timingNow.isBefore(moment(timings["Maghrib"],"hh:mm"))){
      indexOfPrayer = 3 
    }else if(timingNow.isAfter(moment(timings["Maghrib"],"hh:mm"))&&timingNow.isBefore(moment(timings["Isha"],"hh:mm"))){
      indexOfPrayer = 4 
    }else{
      indexOfPrayer = 5
    }
    setNextPrayer(indexOfPrayer)
  }
  return (
    <>
      <Grid container spacing={30}>
        <Grid xs={6} >
          <div>
            <h3>{today}</h3>
            <h2>{selectedCity.displaycity}</h2>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h3>الصلاة القادمه هي صلاة {prayers[nextPrayer].displayPrayer}</h3>
          </div>
        </Grid>
      </Grid>
      <Divider
        variant="right"
        style={{ borderColor: "white", opacity: "0.4", marginBottom: "10px" }}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        style={{ marginBottom: "10px" }}
      >
        <MediaCard title="الفجر" time={timings.Fajr}  image="Alfajr.jpg" />
        <MediaCard title="الشروق" time={timings.Sunrise}  image="shrouk.jpeg" />
        <MediaCard title="الظهر" time={timings.Dhuhr}  image="AlThHr.jpg" />
        <MediaCard title="العصر" time={timings.Asr} image="asr.jpeg" />
        <MediaCard title="المغرب" time={timings.Maghrib} image="Almaghrb.jpeg" />
        <MediaCard title="العشاء" time={timings.Isha}  image="Alasha.jpeg" />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ width: "20%", margin: "auto" }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(e) =>{
                    const objectCity= AllCitiesAvilable.find((city)=>{
                      return city.apiCity==e.target.value
                    })
                    setSelectedCity(objectCity)
            }}
          >
            {AllCitiesAvilable.map((city)=>{
              return(
                <MenuItem value={city.apiCity} key={city.id}>{city.displaycity}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
