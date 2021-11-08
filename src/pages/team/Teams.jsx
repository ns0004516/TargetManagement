import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/Navigation";
import RowTeam from "../../components/rows/team-row";
import SideBar from "../../components/Sidebar";
import { getTeams } from "../../http";

const Teams = () =>
{
    const [loading,setLoading] = useState(true);
    const [teams,setTeams] = useState({});
    useEffect(()=>{
        (async ()=>{
            const {data} = await getTeams();
            if(data.success)
            {
                setTeams(data.data);
                setLoading(false);
            }
        })();
    },[])

    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Teams'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Teams</h4>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md center-text">
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Leader</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        {
                          !loading && teams && teams.map((data,index)=>
                          {
                            return <RowTeam index={index+1} data={data} />
                          })

                        }
                      </table>
                    </div>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default Teams;