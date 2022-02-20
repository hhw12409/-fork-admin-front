import React from "react";
import styled from "styled-components";

interface Props {
  content: object[];
  keys: string[]
}

const Table: React.FC<Props> = ({
  content = [],
  keys = []
}) => {
  // const keys = Object.keys(content[0])||[];
  return <TableWrapper>
    <tr>{keys.map((el, idx) => <th key={idx}>{el}</th>)}</tr>
  </TableWrapper>
}

export default Table

const TableWrapper = styled.table``;