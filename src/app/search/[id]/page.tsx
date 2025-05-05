import SearchMusic from "../../../components/search/searchMusic"

const SearchPage = async (props :any) => {
const {params} = props;
console.log("params >>> ", params)



    return (
        <>
            <SearchMusic
                search={params.id }
            />
        </>
    )
}
export default SearchPage