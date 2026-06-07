import "./ChatWindow.css";
import ChatInput from "./ChatInput";
import Chat from "./Chat.jsx";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";

export default function ChatWindow(){
   const {loading ,setLoading} = useContext(MyContext); 
    return(
        <section className="ChatWindow">
            <div className="navbar">
                <p>SigmaGPT</p>
                <button>Login/SignUp</button>
            </div>
            <Chat/>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas quam veritatis laudantium, iste minus sit, odit eligendi accusamus enim adipisci, culpa mollitia nihil earum voluptate unde architecto assumenda neque. Reiciendis.
            Voluptatum officiis et nihil odit maxime dignissimos eos minus ab quibusdam vero tempora praesentium nostrum velit provident accusantium suscipit eligendi ratione quaerat eum excepturi modi, ullam, laborum nam facere. Asperiores.
            Eveniet culpa neque voluptatibus ipsa labore reprehenderit, exercitationem tempora necessitatibus ut possimus aut similique natus vero repellat est deleniti obcaecati illum enim temporibus illo, qui laborum soluta odit quo. Provident.
            Quis accusamus ad deleniti doloremque atque quasi harum, accusantium mollitia aut nostrum laborum illo blanditiis natus aperiam veniam consequatur suscipit. Consequuntur veniam nostrum eaque? Voluptates eius suscipit corporis mollitia doloremque?
            Vero, inventore? Similique officiis ex repellat accusamus saepe eaque aperiam, quod dignissimos eveniet provident aspernatur eum magni quos tenetur nemo. Quibusdam est quis delectus quaerat, illo quos et architecto. Maiores?
            Dicta aperiam pariatur vero iure voluptate consequuntur sequi vitae magnam, itaque vel ex quaerat eius magni repellendus provident ipsum culpa dolorem quisquam, labore repellat? Veniam, eveniet nihil! Repellendus, labore delectus.
            Enim id quasi iure qui repellat error, vero quae accusamus aliquid culpa, hic adipisci odio soluta voluptate, nulla dignissimos delectus obcaecati? Consectetur, repellat distinctio. Cumque sed officiis magni error doloremque.
            Ut ducimus, quo, eos cum voluptatem odit obcaecati fugiat veritatis asperiores reprehenderit at officia nihil quidem beatae repellendus cupiditate aperiam provident? Animi minima illo veritatis quidem nobis, quas ea dolores.
            Repellat accusamus ut itaque, architecto veritatis, cum ex saepe, deleniti similique necessitatibus reprehenderit perferendis sit assumenda nesciunt! Hic quos ad tenetur impedit commodi minima tempore amet aperiam, sint eum ullam!
            Impedit debitis alias harum cumque quia libero facilis deleniti molestiae, modi repudiandae cupiditate similique sunt at consequuntur dignissimos quod tempore vero, totam itaque placeat consectetur dolores! Nobis ducimus nihil aut.
            <ScaleLoader color={"white"} loading={loading} style={{width:"100%",textAlign:"center"}}/>
            <ChatInput/> 
        </section>
    )
}