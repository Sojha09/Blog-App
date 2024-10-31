import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { categories } from "../constants/data.js";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 3px solid rgba(224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;

  &:hover {
    background: #5a9bd5;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton aria-label="Create a new blog">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <StyledLink to="/">All Categories </StyledLink>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {" "}
                  <StyledLink to={`/?category=${category.type}`}>
                    {category.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No categories available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
