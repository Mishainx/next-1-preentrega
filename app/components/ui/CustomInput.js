const CustomInput = (children, className='',...props) => {
  console.log(props)
    return (
        <input className={`${className}`} {...props}/>
    )
}

export default CustomInput