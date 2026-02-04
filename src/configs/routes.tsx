import Accordian from "../component/Accordian";
import { AutocompleteDemo } from "../component/Autocomplete";
import { CarouselDemo } from "../component/Carausal";
import CheckboxItem from "../component/CheckboxItem";
import CountryCapitalGame from "../component/CountryCapitalGame";
import CustomGrid from "../component/CustomGrid";
import { DataTable } from "../component/DataTable";
import Dropdown from "../component/Dropdown";
import FileExplorer from "../component/FileExplorer";
import Grid from "../component/Grid";
import InfiniteScroll from "../component/InfiniteScroll";
import Like from "../component/Like";
import { ModalDemo } from "../component/Modal";
import MultiStepForm from "../component/MultiStepForm";
import OTP from "../component/OTP";
import { PaginationDemo } from "../component/Pagination";
import Progress from "../component/Progress";
import StarRating from "../component/StarRating";
import StopWatch from "../component/StopWatch";
import SwitchCase from "../component/SwitchCase";
import Tabs from "../component/Tabs";
import TicTacToe from "../component/TicTacToe";
import Timer from "../component/Timer";
import Todo from "../component/Todo";
import TrafficLight from "../component/TrafficLight";
import TransferList from "../component/TransferList";

export const routes = [
  {
    key: "otp",
    name: "OTP",
    path: "/otp",
    element: <OTP />,
  },
  {
    key: "grid",
    name: "Grid",
    path: "/grid",
    element: <Grid />,
  },
  {
    key: "progress",
    name: "Progress Bar",
    path: "/progress",
    element: <Progress />,
  },
  {
    key: "infinite",
    name: "Infinite Scroll",
    path: "/infinite-scroll",
    element: <InfiniteScroll />,
  },
  {
    key: "star-rating",
    name: "Star Rating",
    path: "/star-rating",
    element: <StarRating />,
  },
  // {
  //   key: "advanced-hooks",
  //   name: "Advanced Hooks",
  //   path: "/advanced-hooks",
  //   element: <Hook />,
  // },
  {
    key: "dropdown",
    name: "Dropdown",
    path: "/drop-down",
    element: <Dropdown />,
  },
  {
    key: "tic-tac-toe",
    name: "Tic Tac Toe",
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    key: "todo",
    name: "Todo List",
    path: "/todo",
    element: <Todo />,
  },
  {
    key: "accordian",
    name: "Accordian",
    path: "/accordian",
    element: <Accordian />,
  },
  {
    key: "tab",
    name: "Tabs",
    path: "/tab",
    element: <Tabs />,
  },
  {
    key: "stopwatch",
    name: "StopWatch",
    path: "/stopwatch",
    element: <StopWatch />,
  },
  {
    key: "autocomplete",
    name: "Autocomplete",
    path: "/autocomplete",
    element: <AutocompleteDemo />,
  },
  {
    key: "multiStepForm",
    name: "Multi Step Form",
    path: "/multi-step-form",
    element: <MultiStepForm />,
  },
  {
    key: "pagination",
    name: "Pagination",
    path: "/pagination",
    element: <PaginationDemo />,
  },
  {
    key: "carousel",
    name: "Carousel",
    path: "/carousel",
    element: <CarouselDemo />,
  },
  // {
  //   key: "basic-filter-search",
  //   name: "Basic Filter Search",
  //   path: "/basic-filter-search",
  //   element: <SearchFilterClient />,
  // },
  {
    key: "modal",
    name: "Modal",
    path: "/modal",
    element: <ModalDemo />,
  },
  {
    key: "custom-grid",
    name: "Custom-Grid",
    path: "/custom-grid",
    element: <CustomGrid />,
  },
  {
    key: "like",
    name: "Like",
    path: "/like",
    element: <Like />,
  },
  {
    key: "traffic-light",
    name: "Traffic Light",
    path: "/traffic-light",
    element: <TrafficLight />,
  },
  {
    key: "transfer-list",
    name: "Transfer List",
    path: "/transfer-list",
    element: <TransferList />,
  },
  {
    key: "nested-checkboxes",
    name: "Nested checkboxes",
    path: "/nested-checkboxes",
    element: <CheckboxItem />,
  },
  {
    key: "data-table",
    name: "Data Table",
    path: "/data-table",
    element: <DataTable />,
  },
  {
    key: "file-explorer",
    name: "File Explorer",
    path: "/file-explorer",
    element: <FileExplorer />,
  },
  {
    key: "country-capital-game",
    name: "Country Capital Game",
    path: "/country-capital-game",
    element: <CountryCapitalGame />,
  },
  {
    key: "switch-case",
    name: "Switch Case",
    path: "/switch-case",
    element: (
      <SwitchCase value={10}>
        <SwitchCase.CustomCase value={1}>
          <div>Case 1</div>
        </SwitchCase.CustomCase>
        <SwitchCase.CustomCase value={2}>
          <div>Case 2</div>
        </SwitchCase.CustomCase>
        <SwitchCase.CustomCase value={(value: any) => value < 2}>
          <div>Case 3</div>
        </SwitchCase.CustomCase>
        <SwitchCase.DefaultCase>
          <div>Default Case</div>
        </SwitchCase.DefaultCase>
      </SwitchCase>
    ),
  },
  {
    key: "timer",
    name: "Timer",
    path: "/timer",
    element: <Timer />,
  },
];
