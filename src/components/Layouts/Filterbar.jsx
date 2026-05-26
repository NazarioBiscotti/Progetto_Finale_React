import Search from "../filters/Search"
import Categories from "../filters/Categories"


export default function Filterbar({ children }) {
    return (
        <div className=" flex w-full justify-between px-5 gap-3 my-5 m-auto">
            {children}
        </div>
    )
}