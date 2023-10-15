
interface Category {
    id: number;
    name: string;
}

export default function Categories() {
    // const [categories, setCategories] = useState<Category[]>([]);
    

    return (
        <div>
            <h1>Categories</h1>
            {/* <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul> */}
        </div>
    );
}
