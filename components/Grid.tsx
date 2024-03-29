import React, {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

const Grid: React.FC = () => {
    const [rowData, setRowData] = useState < RowData[] > ([]);
    const [gridApi, setGridApi] = useState < agGrid.GridApi | null > (null);
    const [gridColumnApi, setGridColumnApi] = useState < agGrid.ColumnApi | null > (null);
    const [searchText, setSearchText] = useState < string > ("");
    const localeText = {
        noRowsToShow: 'Please search for data. Enter a search term above.',
        // Add other overrides as needed
    };
    const onSearchInputChange = (event : React.ChangeEvent<HTMLInputElement>) => { // const newSearchText = event.target.value;
        setSearchText(event.target.value);
        applySearchFilter(event.target.value);
    };

    const applySearchFilter = (value : string) => {
        if (gridApi) {
            gridApi.setQuickFilter(value);
        }
    };

    useEffect(() => {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then((response) => response.json()).then((data) => setRowData(data));
    }, []);

    const columnDefs: agGrid.ColDef[] = [
        {
            field: "athlete",
            filter: "agTextColumnFilter"
        },
        {
            field: "age",
            filter: "agNumberColumnFilter"
        },
        {
            field: "country",
            filter: "agSetColumnFilter"
        },
        {
            field: "year",
            filter: "agNumberColumnFilter"
        }, {
            field: "date",
            filter: "agDateColumnFilter"
        }, {
            field: "sport",
            filter: "agTextColumnFilter"
        }, {
            field: "gold",
            filter: "agNumberColumnFilter"
        }, {
            field: "silver",
            filter: "agNumberColumnFilter"
        }, {
            field: "bronze",
            filter: "agNumberColumnFilter"
        }, {
            field: "total",
            filter: "agNumberColumnFilter"
        },
    ];

    const defaultColDef: agGrid.ColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true
    };

    const onGridReady = (params : agGrid.GridReadyEvent) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onPaginationChanged = () => {
        console.log("onPaginationChanged");
    };

    const clearFilters = () => {
        if (gridApi) {
            gridApi.setFilterModel(null);
        }
    };

    const isTableEmpty = searchText.trim() === "";

    return(< div className = "ag-theme-alpine grid-container" > <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563]"> < div > <label htmlFor="search" className="mr-2"> Search : </label> < input type = "text" id = "search" value = {
        searchText
    }
    onChange = {
        onSearchInputChange
    }
    placeholder = "Type to search..." /> </div> < button className = "rounded bg-gray-200 px-3 py-1" onClick = {
        clearFilters
    } > Clear Filters < /button>
      </div > {
        isTableEmpty && <p> Please search for data.Enter a search term above. < /p>}

      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={isTableEmpty ? [] : rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
        localeText={localeText} // Set the custom localeText

      / > <style jsx global> {
            `
        .grid-container {
          height: 800px;
          width: 100%;
        }
        .ag-grid .ag-cell {
          padding: 0.5rem;
          font-size: 1.2rem;
          color: #4b5563;
          border-color: #e5e7eb;
          line-height: 1.5;
        }
        .ag-grid .ag-header-cell {
          font-weight: 600;
          font-size: 1.2rem;
          color: #374151;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }
      `


        


    } < /style>
    </div >);
};

export default Grid;
