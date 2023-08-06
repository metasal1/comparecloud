import styles from '../styles/Home.module.css'
import React from 'react';
import { useAsyncList } from "@react-stately/data";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import Header from './Header';
import Grid from './Grid';
import Footer from './Footer';
import data from './data.json'; // Import data from data.json file
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
export default function Home() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  let list = useAsyncList({
    async load({ signal }) {
      // let res = await fetch('https://swapi.py4e.com/api/people/?search', {
      //   signal,
      // });
      // let json = await res.json();

      setIsLoading(false);

      return {
        // items: json.results,
        items: data,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  let filteredItems = list.items.filter(item =>
    item.Amazon.toLowerCase().includes(searchTerm.toLowerCase())
    || item.Google.toLowerCase().includes(searchTerm.toLowerCase())
    || item.Microsoft.toLowerCase().includes(searchTerm.toLowerCase())
    || item.Oracle.toLowerCase().includes(searchTerm.toLowerCase())

  );
  return (
    <div className={styles.container}>
      <Header />
      <Input
        label="Search"
        isClearable
        onClear={() => setSearchTerm("")}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to filter ..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      // classNames={{
      //   table: "min-h-[400px]",
      // }}
      >
        <TableHeader>
          <TableColumn key="Amazon" allowsSorting>
            Amazon
          </TableColumn>
          <TableColumn key="Google" allowsSorting>
            Google
          </TableColumn>
          <TableColumn key="Microsoft" allowsSorting>
            Microsoft
          </TableColumn>
          <TableColumn key="Oracle" allowsSorting>
            Oracle
          </TableColumn>
        </TableHeader>
        <TableBody
          items={filteredItems}
          // items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Footer />
    </div >
  )
}
