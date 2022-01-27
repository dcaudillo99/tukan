const TextInput = ({label, type, value}) => {
    return(
        <div className="mb-6 pt-3 rounded bg-gray-200">
            <label className="flex justify-left text-gray-700 text-sm font-bold mb-2 ml-3">{label}</label>
            <input value={value} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3" type={type}/>
        </div>
    )
}

export default TextInput;