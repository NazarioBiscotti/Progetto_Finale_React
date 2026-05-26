import CardWrapper from "../components/Layouts/CardWrapper";
import Filterbar from "../components/Layouts/Filterbar";
import Header from "../components/Header";

export default function Homepage() {

    return (<>

        <Header />

        <main className="w-full max-w-6xl mx-auto px-3 sm:px-5">
        <h1 className="text-2xl my-5 text-white">Homepage</h1>

            
            <CardWrapper />

        </main>

    </>)
}