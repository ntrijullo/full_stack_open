const Filter = (props) =>{
    return(
        <div>
            Filter show with <input value={props.search} onChange={props.onChange} />
        </div>
    )
}

export default Filter