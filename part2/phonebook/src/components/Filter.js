const Filter = props => {
    return (
        <>filter shown with <input value={props.filter} onChange={props.filterByName} type="text" /></>
    )
}

export default Filter;