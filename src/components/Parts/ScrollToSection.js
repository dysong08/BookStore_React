import { useRef } from "react"

export default function ScrollToSection() {

    const sectionRef = useRef();

    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
        </div>
    )
}