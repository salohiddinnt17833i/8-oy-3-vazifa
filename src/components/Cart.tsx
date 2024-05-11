import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function Cart(props) {
    const { data } = props;
    const { name, dateTime, date, id } = data;

    function HandleDelete(event: MouseEvent) {
        const storeData = JSON.parse(localStorage.getItem('todos'))
        const updateTodo = storeData.filter(ele => ele.id !== event)

        localStorage.setItem('todos', JSON.stringify(updateTodo))
    }


    return (
        <div className="flex items-center justify-between p-2 bg-white rounded-xl">
            <div className="flex items-center gap-4">
                <div className="form-control">
                    <input type="checkbox" defaultChecked className="checkbox" />
                </div>
                <div>
                    <h3 className="text-[20px] font-semibold">{name}</h3>
                    <span>
                        <span className="text-[15px]">{dateTime}, </span>
                        <span className="text-[15px]">{date}</span>
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => { HandleDelete(id) }} className="btn ">
                    <MdDelete className="text-[25px]"></MdDelete>
                </button>
                <button className="btn ">
                    <MdEdit className="text-[25px]"></MdEdit>
                </button>
            </div>
        </div>
    )
}

export default Cart;
