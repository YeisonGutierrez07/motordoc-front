import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Row, Col, Spin } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllWorkshopService } from "../../../services/workshops";
import DetailWorkshop from "./detailWorkshop";
import { setWorkshops } from "../../../redux/appointment";

export class misWorkShops extends Component {
  state = {
    workshops: [],
    loading: true
  };

  componentDidMount() {
    this.getAll("");
  }

  getAll = search => {
    getAllWorkshopService(search).then(response => {
      this.setState({
        workshops: response,
        loading: false
      });
      const { setWorkshops: setWorkshop } = this.props;
      setWorkshop(response);
    });
  };

  render() {
    const { workshops, loading } = this.state;
    const { history } = this.props;

    const loadingData = () => {
      if (loading) {
        return (
          <div align="center">
            <Spin />
          </div>
        );
      }
      return null;
    };

    return (
      <Authorize roles={["CLIENT"]} redirect to="/404">
        <Helmet title="Talleres" />
        <div className="card">
          <div className="card-body">
            <Row>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title">
                          <h4 style={{ color: "red" }}>
                            Listado de mis Talleres
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  {loadingData()}
                  <div className="card-body">
                    {Object.keys(workshops).map(c => (
                      <div key={c}>
                        <br />
                        <DetailWorkshop info={workshops[c]} history={history} />
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

const mapStateToProps = data => ({ workshops: data.workshops });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setWorkshops }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(misWorkShops);
