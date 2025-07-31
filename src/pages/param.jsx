import { useParams } from 'react-router-dom'

function Param() {
    const { id } = useParams()
    return (
        <div>Param id: {id}</div>
    )
}

export default Param
