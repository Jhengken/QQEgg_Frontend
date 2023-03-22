import { defineStore } from 'pinia'
import axios from 'axios';
import { reactive } from "vue";
import photo from "../assets/img/202303chengbao.jpg"

export const useProductStore = defineStore('ProductsAxios', () => {
    const productPAndS = reactive([]);
    const productRoom = reactive([]);
    const markers = reactive([]);
    const cardinfo = reactive([]);


    //建立class
    class PAndS {
        constructor(pName, sName, sImage, sOpenTime, sLatitude, sLongitude, sAddress, sDescription, rNum) {
            this.pName = pName;
            this.sName = sName;
            this.sImage = sImage;
            this.sOpenTime = sOpenTime;
            this.sLatitude = sLatitude;
            this.sLongitude = sLongitude;
            this.sAddress = sAddress;
            this.sDescription = sDescription;
            this.rNum = rNum;
        }
    }
    class Room {
        constructor(pName, sName, rCategoryId, rHourPrice, rDatePrice, rPing, rImage, rStatus, rDescription) {
            this.pName = pName;
            this.sName = sName;
            this.rCategoryId = rCategoryId;
            this.rHourPrice = rHourPrice;
            this.rDatePrice = rDatePrice;
            this.rPing = rPing;
            this.rImage = rImage;
            this.rStatus = rStatus;
            this.rDescription = rDescription;
        }
    }
    //axios 取資料
    const axiosInit = async () => {
        try {
            const res = await axios.get("https://localhost:7073/api/Products");
            res.data.forEach((product, pidx) => {

                //抓PAndS資料
                product.psite.forEach((site, sidx) => {
                    const tpands = new PAndS(product.name, site.name, site.image, site.openTime, site.latitude, site.longitude, site.address, site.siteDescription, site.psiteRoom.length)
                    productPAndS.push(tpands);

                    //抓Room資料
                    site.psiteRoom.forEach((room, ridx) => {
                        const troom = new Room(product.name, site.name, room.categoryId, room.hourPrice, room.datePrice, room.ping, room.image, room.status, room.roomDescription);
                        productRoom.push(troom);
                    })
                })
            });

            console.log(productPAndS);
            console.log(productRoom);
            //加載資料到marker中
            productPAndS.forEach((pands) => {
                const marker = {
                    lat: parseFloat(pands.sLatitude),
                    lng: parseFloat(pands.sLongitude),
                    name: pands.sName,
                    description: pands.sDescription
                };
                markers.push(marker);
            });
            console.log(markers);

            const path = "/src/assets/img/"
            // 加入資料到cardinfo
            productRoom.forEach((room) => {
                const carditem = {
                    icon: "touch_app",
                    title: room.sName,
                    image: path + room.rImage,
                    description: room.rDescription,
                    action: [
                        {
                            route: `/views/rentroomview/${id}`,
                            label: "現在就訂房",
                        },
                    ],
                }
                cardinfo.push(carditem)
            })
            console.log(cardinfo)



        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        axiosInit, productPAndS, productRoom, markers, cardinfo
    }
});

