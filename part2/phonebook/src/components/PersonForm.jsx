const PersonForm = (props) => {
    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <div>name: <input value={props.name} onChange={props.setName} /></div>
                <div>number: <input value={props.number} onChange={props.setPerson} /></div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm