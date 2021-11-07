import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCounts } from "../http";
import { setCount } from "../store/main-slice";
import CountsCard from './dashboard/CountsCard';
import HeaderSection from "./HeaderSection";

const DashboardAdmin = () =>
{
  const dispatch = useDispatch();
  useEffect(()=>{
    (async ()=>
    {
      const {data} = await getCounts();
      console.log(data);
      dispatch(setCount(data.data));
    })();
  },[])

  const {counts}  = useSelector((state)=>state.mainSlice);
  console.log(counts);
  const {admin,employee,leader,team} = counts;

    return(
        <div className="main-content">
        <section className="section">
         <HeaderSection title='Dashboard'/>
          <div className="row">
            <CountsCard title='Total Employee' icon='fa-user' count={employee}/>
            <CountsCard title='Total Leader' icon='fa-user' count={leader}/>
            <CountsCard title='Total Admin' icon='fa-user' count={admin}/>
            <CountsCard title='Total Team' icon='fa-user' count={team}/>
          </div>
        </section>
      </div>
    )
}

export default DashboardAdmin;