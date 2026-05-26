export default function Categories({ setCategory }) {

    function handleCategories(e) {
        const value = e.target.value
        setCategory(value)
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center  sm:gap-3  text-lg sm:text-2xl w-full sm:w-auto min-w-0">

        

            <select
                onChange={handleCategories}
                className="border-2 border-amber-950 bg-gray-500 text-white p-2 rounded-md w-full sm:w-48 max-w-full truncate" >

                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Adventure">Adventure</option>
                <option value="Indie">Indie</option>
                <option value="Shooter">Shooter</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>

                
            </select>



        </div>
    )
}