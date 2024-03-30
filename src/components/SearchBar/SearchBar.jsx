import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css'
import { RiSearchEyeLine } from "react-icons/ri";

export default function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            toast.error('Please enter a search query!');
            return;
        }
        
        setIsSubmitting(true);
        try {
            await onSubmit(trimmedQuery);
            setQuery('');
        } catch (error) {
            toast.error('An error occurred while fetching images.');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <header className={css.header}>          
            <form className={css.form} onSubmit={handleSubmit}>
                <button className={css.searchButton} type="submit" disabled={isSubmitting}>
                     <RiSearchEyeLine size="18px"/>
                </button>               
                <input className={css.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    ref={inputRef}
                />
                    {isSubmitting && <span>Searching...</span>}
                </form>
               
        </header>
    );
}