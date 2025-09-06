export interface IFilterProps {
    filterName: string;
    setFilterName: (value: string) => void;
    filterAddress: string;
    setFilterAddress: (value: string) => void;
    filterMinPrice: number | "";
    setFilterMinPrice: (value: number | "") => void;
    filterMaxPrice: number | "";
    setFilterMaxPrice: (value: number | "") => void;
    onApplyFilter: () => void;
}
