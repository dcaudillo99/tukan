const TukanButton = ({type, label, otherProps}) => {
  return <button {...otherProps} type={type} className="opacity-80 hover:opacity-100 px-4 rounded-sm text-slate-50 bg-teal-600 drop-shadow-lg hover:drop-shadow-2xl">{label}</button>
}

export default TukanButton;