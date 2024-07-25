// CSVViewer.tsx

import React from 'react';

interface Props {
  data: any[];
}

const GridViewCSV: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return <p></p>;
  }

  const headers = Object.keys(data[0]);

  return (
<div className="csv-viewer">
    <table className="centered-table">
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {headers.map((header, index) => (
                        <td key={index}>{row[header]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>
  );
};

export default GridViewCSV;
