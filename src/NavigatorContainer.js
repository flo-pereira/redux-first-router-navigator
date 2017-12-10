import { connect } from 'react-redux';
import Navigator from './Navigator';

const mapStateToProps = ({ location: { type, routesMap, payload } }) => ({
  Component: routesMap[type] ? routesMap[type].Component : null,
  payload,
});

export default connect(mapStateToProps)(Navigator);
