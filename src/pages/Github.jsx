import React, { useEffect, useState } from 'react'

function Github() {
    const [subs, setsubs] = useState([])

    useEffect(() => {
        fetch(`https://api.github.com/users/GauravVashist239247`)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setsubs(data)
            })
    }, [])

    return (
        <div>Github live followers: {subs.followers}</div>
    )
}

export default Github;

