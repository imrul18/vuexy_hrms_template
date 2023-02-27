import React, { Suspense, useEffect } from "react"
import Pusher from "pusher-js"
import toast from "react-hot-toast"
import Swal from 'sweetalert2'

// ** Router Import
import Router from "./router/Router"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllNotifications,
  getAllPermission,
  pushNotifications
} from "./redux/globalStore"
import { Bell, X } from "react-feather"
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "./config"


const App = () => {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.auth)

  const getNotification = () => {
    dispatch(getAllNotifications(store?.userData?.id))
  }

  const getPermissions = () => {
    dispatch(getAllPermission())
  }

  const newNotification = (item) => {
    toast(
      (t) => (
        <div className="w-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Bell size="32" className="me-1" />
            <div>
              <p className="mb-0">{item?.data?.title}</p>
              <small>{item?.data?.subtitle}</small>
            </div>
          </div>
          <X size="14" onClick={() => toast.dismiss(t.id)} />
        </div>
      ),
      {
        style: {
          minWidth: "300px"
        }
      }
    )
    dispatch(
      pushNotifications({
        id: item?.id,
        title: item?.data?.title,
        subtitle: item?.data?.subtitle,
        url: item?.data?.url,
        datetime: item?.created_at,
        data: item?.data?.data
      })
    )
  }

  const handleTimeoutAlert = () => {
    let timerInterval
    Swal.fire({
      title: 'Your Permission is Updated!',
      html: '<small>Please wait for while...</small><br />It will take a reload in <b></b> seconds.',
      timerProgressBar: true,
      timer: 5000,
      didOpen() {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Math.floor(Swal.getTimerLeft() / 1000)
        }, 10)
      },
      willClose() {
        clearInterval(timerInterval)
      }
    }).then(function (result) {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }


  useEffect(() => {
    if (store?.userData?.id) {
      getNotification()
      getPermissions()
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
        forceTLS: true
      })
      pusher
        .subscribe("prokpi")
        .bind(`notification-${store?.userData?.id}`, async function (item) {
          newNotification(item)
        })

      pusher
        .subscribe("prokpi")
        .bind(`permissions-${store?.userData?.role_id}`, async function () {      
          getPermissions()
          handleTimeoutAlert()
          setTimeout(() => { window.location = '/' }, 5000)          
        })
    }
  }, [store?.userData])

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
