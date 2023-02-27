// ** Icons Import
import { Calendar, CheckSquare, Circle, FileText, Mail, MessageSquare, Settings, Shield, ShoppingCart, User } from 'react-feather'


export default [
  {
    header: 'Others',
    permission:'user-management_access',
    isAccess: true
  },
  {
    id: 'email',
    isAccess: true,
    title: 'Email',
    icon: <Mail size={20} />,
    navLink: '/apps/email'
  },
  {
    id: 'chat',
    isAccess: true,
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat'
  },
  {
    id: 'todo',
    isAccess: true,
    title: 'Todo',
    icon: <CheckSquare size={20} />,
    navLink: '/apps/todo'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    isAccess: true,
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar'
  },
  {
    id: 'kanban',
    title: 'Kanban',
    isAccess: true,
    icon: <CheckSquare size={20} />,
    navLink: '/apps/kanban'
  },
  {
    id: 'invoiceApp',
    isAccess: true,
    title: 'Invoice',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'List',
        isAccess: true,
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        isAccess: true,
        navLink: '/apps/invoice/preview'
      },
      {
        id: 'invoiceEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        isAccess: true,
        navLink: '/apps/invoice/edit'
      },
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        isAccess: true,
        navLink: '/apps/invoice/add'
      }
    ]
  },
  {
    id: 'eCommerce',
    title: 'eCommerce',
    isAccess: true,
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'shop',
        isAccess: true,
        title: 'Shop',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/shop'
      },
      {
        id: 'detail',
        isAccess: true,
        title: 'Details',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/product-detail'
      },
      {
        id: 'wishList',
        title: 'Wish List',
        isAccess: true,
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/wishlist'
      },
      {
        id: 'checkout',
        title: 'Checkout',
        isAccess: true,
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/checkout'
      }
    ]
  }  
]
