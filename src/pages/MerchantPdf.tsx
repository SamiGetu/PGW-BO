import React from "react";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image, // Import Image component
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import person from "../assets/images/elizeu-dias-2EGNqazbAMk-unsplash.jpg";
import Logo from "../assets/logo.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    paddingTop: 20,
  },
  heading: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 15,
  },
  detailItem: {
    fontSize: 12,
    marginBottom: 5,
    border: "2px solid black",
    padding: 5,
  },
  logo: {
    width: 100,
    height: "auto",
    marginBottom: 10,
    marginRight: 40,
  },
  profile: {
    width: 100,
    height: "auto",
    marginBottom: 10,
    marginLeft: 40,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    display: "flex",
    gap: "10rem",
    flexDirection: "row",
  },
  labelItem: {
    fontWeight: "bold",
    marginRight: 80,
    width: 100,
  },
});

const MerchantPdf = () => {
  const location = useLocation();
  //   const applicant = location.state;

  //   const date = Date.now();

  return (
    <PDFViewer height={`${window.innerHeight}`} width={"100%"}>
      <Document title={"Applicant Detail"}>
        <Page size="A4" style={styles.page} wrap orientation="portrait">
          <View style={{}}>
            <Text
              style={{
                marginBottom: "10px",
                paddingBottom: "3px",
                fontSize: "20px",
                margin: "40px auto",
              }}
            >
              Merchant Profile Information{" "}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "0 auto",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
                width: "80%",
              }}
            >
              <Image src={Logo} style={styles.profile} />
              <View style={{ fontSize: "15px", fontWeight: "bold" }}>
                <Text
                  style={{
                    borderBottom: "1px solid black",
                    marginBottom: "3px",
                    paddingBottom: "3px",
                  }}
                >
                  Applied on 6/1/24
                </Text>

                {/* <Text style={""}>DLT Result: {applicant.DLTResult}</Text> */}
              </View>
              <Image src={person} style={styles.profile} />
            </View>
            <View style={{ margin: "0 auto", width: "80%" }}>
              <View>
                <Text style={styles.heading}>Personal Information</Text>
                <View style={styles.detailItem}>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>First Name </Text>
                    <Text>Abebe</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Middle Name </Text>
                    <Text>Kebede</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Last Name </Text>
                    <Text>dani</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Merchant Type </Text>
                    <Text> Company</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Business Name:</Text>
                    <Text> Invictus Software Development PLC</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Tin Number</Text>
                    <Text> 123456</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Licence Reg.No </Text>
                    <Text> 12345</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Principal Reg.No </Text>
                    <Text>54321</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Merchant Type </Text>
                    <Text> Company</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Email </Text>
                    <Text>example@gmail.com</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>
                      Primary Bank Account Name{" "}
                    </Text>
                    <Text>Invictus Software Development PLC</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.heading}>Bank Information</Text>
                <View style={styles.detailItem}>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Bank of Abyssinia </Text>
                    <Text style={styles.labelItem}>1235633220008</Text>
                    <Text>PRIMARY</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>
                      Commercial Bank of Ethiopia{" "}
                    </Text>
                    <Text style={styles.labelItem}>1000045654311</Text>
                    <Text> SECONDARY</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Berhan Bank</Text>
                    <Text style={styles.labelItem}>111230987345</Text>
                    <Text> SECONDARY</Text>
                  </View>
                  {/* <View style={styles.label}>
                    <Text style={styles.labelItem}>Education Level: </Text>
                    <Text>Degree</Text>
                  </View> */}
                </View>
              </View>
              {/* <View>
                <Text style={styles.heading}>Education Detail </Text>
                <View style={styles.detailItem}>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Grade 10 Result </Text>
                    <Text>3.5</Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.labelItem}>Grade 12 Result </Text>
                    <Text>600</Text>
                  </View>
                </View>
              </View> */}
              <Text
                style={{
                  fontSize: 8,
                  textAlign: "right",
                  marginTop: "200px",
                  marginBottom: 10,
                }}
              >
                Kispay Finacial Solutions S.C
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MerchantPdf;
