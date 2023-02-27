// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Table Columns
import { columns } from "./columns"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import {
  addWindowEmployee,
  completePeriod,
  getAllEmployeeForWindow,
  getPeriod,
  getWindowEmployee,
  startEvaluation,
  startPeriod
} from "../store"

// ** Third Party Components
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import ReactPaginate from "react-paginate"
import Select from "react-select"

import { selectThemeColors } from "@utils"

// ** Reactstrap Imports
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from "reactstrap"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { useParams } from "react-router-dom"
import makeAnimated from "react-select/animated"

// ** Table Header
const CustomHeader = ({
  store,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  currentStatus,
  setCurrentStatus,
  startEvaluation
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="2" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="3"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className=" align-items-center w-100"></div>
        </Col>
        <Col
          xl="2"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className=" align-items-center w-100">
            <Select
              isClearable={false}
              value={currentStatus}
              options={store.kpistatusOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(data) => {
                setCurrentStatus(data)
              }}
            />
          </div>
        </Col>
        <Col
          xl="3"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-150"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </Col>
        <Col md="2">
          <div className="d-flex align-items-center table-header-actions">
            {store?.Window && (
              <Button
                className="add-new-user"
                color="primary"
                onClick={startEvaluation}
              >
                {store?.Window?.status}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const WindowEmployeeList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.windows)
  const { id } = useParams()

  const [addShow, setAddShow] = useState(false)
  const animatedComponents = makeAnimated()

  // ** States
  const [data, setData] = useState(null)
  const [sort, setSort] = useState("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState("id")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select KPI Status"
  })

  useEffect(() => {
    setData({ ...data, id })
  }, [id])

  // ** Function to toggle sidebar

  useEffect(() => {
    dispatch(
      getWindowEmployee({
        id,
        param: {
          sort,
          sortColumn,
          q: searchTerm,
          page: currentPage,
          perPage: rowsPerPage,
          status: currentStatus?.value
        }
      })
    )
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    rowsPerPage,
    searchTerm,
    currentStatus
  ])

  useEffect(() => {
    dispatch(getPeriod())
    dispatch(getAllEmployeeForWindow(id))
  }, [])

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => setCurrentPage(page.selected + 1)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store?.WindowEmployee?.length > 0) {
      return store.WindowEmployee
    } else if (store?.WindowEmployee?.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getWindowEmployee({
        id,
        param: {
          sort,
          sortColumn,
          q: searchTerm,
          page: currentPage,
          perPage: rowsPerPage
        }
      })
    )
  }

  const submitEvaluation = () => {
    const params = {
      sort,
      sortColumn,
      q: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }
    console.log(store?.Window?.status_id)
    switch (store?.Window?.status_id) {
      case 1:
      case 2:
        setAddShow(!addShow)
        break
      case 3:
        dispatch(
          startPeriod({
            id,
            param: params
          })
        )
        break
      case 4:
        dispatch(
          completePeriod({
            id,
            param: params
          })
        )
        break
      case 5:
        dispatch(
          startEvaluation({
            id,
            param: params
          })
        )
        break
    }
  }


  const onMultiSelectChange = (name, list) => {
    const value = list?.map((item) => {
      return item?.value
    })
    setData({
      ...data,
      [name]: value
    })
  }

  const onSubmitNewEmployee = (e) => {
    e.preventDefault()
    dispatch(addWindowEmployee(data))
    setAddShow(!addShow)
  }

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
                startEvaluation={submitEvaluation}
              />
            }
          />
        </div>
      </Card>

      <Modal
        isOpen={addShow}
        toggle={() => setAddShow(!addShow)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setAddShow(!addShow)}
        ></ModalHeader>
        <ModalBody className="px-2 pb-2">
          <Row>
            <Col xs={3}></Col>

            <Col className="text-center mt-2" xs={6}>
              <div className="text-center mb-4">
                <h1>Add Employee</h1>
              </div>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={store?.allEmployeeOptions}
                onChange={(e) => onMultiSelectChange("employee_id", e)}
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
            <Col xs={3}></Col>
          </Row>

          <Row tag="form" onSubmit={onSubmitNewEmployee}>
            <Col className="text-center mt-2" xs={12}>
              <Button type="submit" color="danger" className="me-1">
                Confirm
              </Button>
              <Button
                type="reset"
                outline
                onClick={() => setAddShow(!addShow)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default WindowEmployeeList
