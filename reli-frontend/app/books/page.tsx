import Link from 'next/link';

function BookPage() {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold underline">
          Welcome to the Divine Manuscripts Library!
        </h1>
        <h2 className="text-3xl m-2">
          Explore our collection of rare and ancient religious texts.
        </h2>
        <div className="flex flex-row mt-6">
          <Link href="/books/categories">
            <div className="outline outline-1 rounded overflow-hidden shadow-lg p-8 m-4">
              <h3 className="text-2xl">Browse by Categories</h3>
            </div>
          </Link>
          <Link href="/books/shelves">
            <div className="outline outline-1 rounded overflow-hidden shadow-lg p-8 m-4 ">
              <h3 className="text-2xl">Browse by Shelves</h3>
            </div>
          </Link>
        </div>
      </div>
    );
}

export default BookPage;
