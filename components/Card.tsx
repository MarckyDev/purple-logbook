
type CardProps = {
    title: string,
    content: string
}

export default function Card({ title, content }: CardProps) {
    return(
        <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl text-purple-700 font-semibold mb-2">{title}</h3>
            <p className="text-pink-500">{content}</p>
        </div>
    );
}