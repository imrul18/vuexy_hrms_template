// ** React Imports
import { useContext } from 'react'

// ** Icons Imports
import { List } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

// ** Utils
import { kFormatter } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'


// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)


  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />          
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.success.main} />
          
        </Col>
        <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
