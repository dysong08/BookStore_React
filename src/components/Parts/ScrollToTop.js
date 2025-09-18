export default function ScrollToTop({ scrollToTop }) {

    return (
        <img src="/images/arrow-up-solid-full.svg" onClick={scrollToTop}
            className="scrollToTopImg"
        />
    )
}