const PersonForm = props => {
    return (
        <form>
            <div>
                name: <input value={props.name} onChange={props.changeName} />
            </div>
            <div>
                number: <input value={props.number} onChange={props.changeNumber} />
            </div>
            <div>
                <button onClick={props.submitForm} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;