import { useState, useEffect } from 'react'

const SearchCollections = ({allCollectionsURL}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredNames, setFilteredNames] = useState([])
    
    let names = allCollectionsURL.map((value) => {
        return value.name
    })

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value
        setSearchTerm(newSearchTerm)
        const filtered = names.filter((name) => 
            name.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
        setFilteredNames(filtered)
    }
    
    const handleSelect = (selectedName) => {
        setSearchTerm(selectedName)
        setFilteredNames([])
    }
    
    return (
        <div className='collections-search-bar'>
            <input 
                className='collections-search-input'
                type="text"
                placeholder='Browse Collections...' 
                value={searchTerm}
                onChange={handleInputChange}
            />
            {filteredNames.length > 0 && (
                <ul className='autocomplete-sugestions'>
                    {
                        filteredNames.map((name, index) => (
                            <li key={index} onClick={() => handleSelect(name)}>
                                {name}
                            </li>
                        ))
                    }
                </ul>
            )
            }
        </div>
    )

}

export default SearchCollections