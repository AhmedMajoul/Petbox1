import React from 'react';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteUser, promoteToAdmin, depromoteToUser } from '../../actions/adminAct';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import './UserCard.css'

const useStyles = makeStyles(theme => ({

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blue[500],
    },
    avatarcomment: {
        backgroundColor: blue[500],
        width: 25,
        height: 25
    },
    supp: {
        color: "#d50000"
    },
    Number: {
        color: "grey",
        fontSize: 15
    }
}));


function UserCard({
    deleteUser,
    promoteToAdmin,
    depromoteToUser,
    auth,
    user
}) {
    const { _id, type, name, email, avatar, adress, phone, date } = user;

    const classes = useStyles();

    const [supp, setsupp] = React.useState(false);
    const handledeleteClick = (id) => {
        setsupp(!supp);
        deleteUser(id);
        document.location.href = "http://localhost:3000/admin";
    };
    const promoteDepromote = (type, id) => {
        if (type === 'admin') {
            return (
                <Button variant="contained" color="secondary" onClick={() =>{
                     depromoteToUser(id);
                     document.location.href = "http://localhost:3000/admin";
                     }}>
                    Depromote to user
                </Button>
            )
        } else {
            return (
                <Button variant="contained" color="primary" onClick={() =>{
                    promoteToAdmin(id);
                    document.location.href = "http://localhost:3000/admin";
                    }}>
                    Promote To Admin
                </Button>
            )
        }
    }
    const CheckForTheLoggedAdmin = () => {
        if (auth.user._id === _id) {
            return (<h3 style={{color:'blue'}}>This is you</h3>)
        } else {
            return (<div>
                <IconButton aria-label={supp}
                    onClick={() => {
                        handledeleteClick(_id);
                    }}
                    className={clsx(classes.dislike, {
                        [classes.supp]: supp,
                    })}>
                    <DeleteIcon />
                </IconButton>
                {promoteDepromote(type, _id)}
            </div>)
        }
    }

    return (
        <Card className="usercard">
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} aria-label="recipe" src={avatar}>
                        M
          </Avatar>

                }
                title={name}
                subheader={<p className='post-date'>
                    Créé en <Moment format='DD/MM/YYYY'>{date}</Moment>
                </p>}
            />
            <div className="content">

                {/* <img className="media" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFhUVFxUVFxYVGBUVFhcVFRUWFhUWFRcYHSggGBolGxYVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLTc3LTc3Lf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAABAwIEBAQEBQIFBAMBAAABAAIRAyEEBRIxBkFRYSJxgZETobHwMkJSwdEHFCNiguHxcpKishUkkxb/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQMCBP/EACMRAAICAgICAwEBAQAAAAAAAAABAhESIQNBMVETImEygUL/2gAMAwEAAhEDEQA/AOmlicYxFKW0laAQ8HqmhTUhyQ09UAONbZRqjLqY0qPWTAFBqZxFKSnqDiixIPJADVGmlOppNIlKe1AA090ltATuiaxJNNAD5pjqgWd0gMSnNQAYYOqW2mOqbbTSwxAArUAgHckWIeYUOnWMpWOiybUUes7wlLoulRcfi2U2nWQFlsaRWOcZUbMn3aiqZzRH5lFzHHMfpLDKhJ6LxRoMtKsQFUZS+YVuEIyw4QhGiTMhEJMJaJACUkhKSSgAoSSEtEUANuCbITjk25IY2USBQQBbNTjQmmlOAroJAckQjJQRYDjE1VSy6E066LCg6SFVCmxE4osBDAlPRSg4oAJqBSQUtt+SACaUcp2lhZ5p04Vo5lKwGmhE5OQOoR6R1CLHTI9SnITTcKp4YORHuEr4PcJAQmNhZvjLBOczU25HJbD4E81FxuXlwgQZQ1aHF0zlVHBujxhT8OwABsLZjh0kEGBvHPYxfrYn2TNXh4CIE7ffzHzXM4SOhckRjJa4NhyV8Cq/A4EU9gp7VpX2YlXQqURRwgWrRkSggBKNyBCURRlEUDEoiUaIpAIcmnJ1yackA2ggUEDLLVCPWm6b9bA7nsUbSrWToXJQlEgiwDQRIIEGXJh1Qp0pp4RY6B8ZE6qmy1HSolxhKx0P4duox/urGnRA3JQoUw0bpvE1oH39eSdmUrYnGYgASDcfcLOYzjLDg6HOg99vcKm4l4hOl2gG35mvkX/07eq5Rj8S59Qukz6H3spW5PR0xhGKtnSM34lMn4dSQehS8rxWJcAXF+ncEuAI7gEy4e3mshkNM3eQ06ANIIEF7jDJGqCANToIvpjmtNhwXCS469y7wyT3jf1lRlFI6Iuy6OYVZ00xP8c4HPz7KxGZ/DEvfcdfos9SxrKTTMTckA79+zu6zGe5y5xiSQdj1H7G3oQeimsujTUezob+MADA91c5JxGysdMw76wuGMxLo3++f1KnZXmjqdZjg7YtP8q0XOLuyM4wkvB381lFGYMFi4T/ALkfVVbMx1U9QO4lc8z7OHAuaHblrffUT8iVec6RzQ47ezrGIxLGtBO3UJmhmNBwkPauaZBxK4/4VV3gfbuBy+Sh8Sv/ALd3xGk3ggD8rYAb6xy5CBuo/K34Rb4UvJ18VGna6TUPv0C5xwzxfrDWhrif1PP7D+FvcJmAItv1ThyqWnoxPicdrZJLdIvufkmEs9U2Vtk0BEUERSGEiKCIoAS5MuTrk05IYhEjRJAS8MNFVzTsf3TzmwYS6oDoMXHNLcJbPMWKu0TTGkcoggsjAjRIJ2ACkEJaKEgGy1PUnxYe6SU/haXMoQMfYyyp+IsSWsLWjUSL2JJ6DoB3MK6r1Q0E9Fx3jDPKtas+kw+Bv4iYgcjci3nbkBZKb6NcUX5IGZ5oA4A6BIIhtwBBlx07xHcWi52xzq+p9zAmwH3v3ViKf4nmdN5c7d5A/wDUAbdh5Cmw2p9eI6fz73RFaNybs2OSNcRpbAlwcdoADXS556C6uhe1Ngd1e8XJ7Md4QPME9woeV4TTSOoluqC7YHS0+FsETckn0CYzDG6bF3w28heSOp9lB7ejpSpbJtfCarVC0f8ASGtI7jTAPqq7E5bTAgvnmNue8dPLzVJXrPcf8Ktq7Ei/YTzTTsUQAHk8jeyMJLsM4ssMVgIADDO//Kqn1S3f7E8kmlmZ1dvspeZuDgHc/v8AZNWtMw6atHWOGMcHUGydmCfOB/B91zriPF6sQQ02Drx5QrLhfHlmDqO6SB68/YlZLDYmXOc65kk+/wDC0/BleS/y+gOZi60j8H8WlBueRt7X+91gKmZS6AY+x9+ivMrz51M7zyjc+yhJSWy6cXobw1F2GcRqc8g3F20mz1du89ACB3dz2uQZ68xqaLdOn7rEcTYt9SCIA3AhoIPM3Ezc+5SuG82hwBNxfpPcEWPkU5xtZIwnTxO34LEaxIUghU2V1WvYHsMbSByJ5/8ASVasJVIStbITVPQohEUcoitmBJSCUslIKAEuKZcU44ppxSGIlGkSglYFrQddw6FNYLEjWRNiYVHwzjvBLzd0bqWajdZ07SrORhRLqoyCkwnKVQPZ3CRCGJBQjhBGkMKEIRhGgBICl04AkpmmySo2eZk2jTc4x4QYHf7j5J+Aq3QnM8R4De9/lyH3vK5HmVNrS51V27nEMaCSTzcZgEwYmecDmF0dxP8Abt1Tqc2TO41eJ0+sLmfEjpquhsAEtA7NJHzPiPmVzylcjq441EocbiC8hpGloBAAvEgi55nYKBk7P/tVJ/W72nopVYAyB+Ub/P8AZVdHE6KzoFzBn0GytHwyUv6TOgYzFhlPUR+ESB1OwssBUbWxdW5AJJALpDZF9De+6uc4Y/4LahO82G1hZRMozF7WMY8sbp1lvgl09XzaPGSI3nyT4YpbFzzbdFFXw9SkZ3bq06mzpLhyBMK5weO+I3RUuRsefKytsk4cq1NI/DQa/W4uBEkFroEkkk6Rfa5WdxAGt5bEanxH6Q4wfUQqSSZOLaLF2X6Wh0iRvzUKtVLrfe9h5ylHMCGaTK0PCWROquBLb7xysQQfvoo0+y1prRdZFlhGG0xvJPvf5LDZnhDSqvEWm3rBH7ru2WZVobpI+yqbiLhAVgdIuf5BP0WqMWclwmXaxPKfqoWIzjQ8tpAAAkTuTy9itNmeT1sGSH7HbzPL0n/lZ/Ch9IPYGN1F/jBi7QZ0Gf267pQjb2PklSVFhlmNdiGO1xLdiJHLeRZVhq6KtpBBu07kbiOvNXIqadLm0w3VSD6gsIc1z2atzuGtJPMyeapMzhztbZB587hYqpNdG7uKfZ13gXNgWtFz87G5afmRzkOHNb1vbbkuIcIZ6KZYH2aSATFrkTPYwD5gELtuFIcwOaZaRIIM79DzCnxqm0Pkp0xYRFKISSqkRBKQ4pZTbkhiHFMvKccmnrLGNkoJJQQBS4VxbSIbyUnLsRIlVPCGYTqY6+91cugBhEfig90O1s2q8F3leNAdB2KsqggrMMwxJLgYvZaalJYAfxBVjtEZKmEhKIsKINKexaFBKaJRtw7+ikUaLh0TSE2Vmd5mMNTLj0Mk8lzHMM3dWa0ucYrVWNAJE6GvdcDq97mg9AwDle4/qTji9wpB1gQPUzE+znHyWYwdNv8AcUGyD8JocGjVbwF7A4wNJ1Pmb77KLds6IxpHT8UbNPQT6ANLvcwPVc6z+hFPUd3kn/Ts35SfVdGxDIpy7m1ojtGo/Mx/pWD4nu5rOkk+TGyfmY9FGX9FoeDA4d34p/M537D9yqzNRprNcNiI9lZVWwA7kXPb8wPqq/ObtB5gz/P32XTB7Ici0aeg/wCNR+HNxBHYprK+I6uE/wAN9FlVg/CHi7ezHC8dlT5RmEQY2++S0Da1CoZfG3IndLJwddDcVNX2IzzjWrWpmlTYKTXCCR4jHOLCJWXw7gDGguN7nvvYeXyV1iGUPyiYE8gB5nkO6fyjL2VnBo1EuOzW6R5hxBMd4G63n+GMN7ZH4dyN1epJabbcwfYyuzcL5AKTWk2I5DZOcL8OMw7BaO0z9AJ9VeYvFMpt1OMBFdsy5dIkNpjonfhhZOlxpRJI6fcpjHcX07aKrZPcfNPJGcHdE/jPhsYmidMa23bIBnsuVVf7WoPhYtpY9ltcEOEbiQPkV1vKs/Dx4nN9CqzifgvDY4/Ea7RUNi5seL/q6p/qH40zkWPdRc6v8DUaTcOaYc/d2lpOrsJO38rK4R/5T6fwt1xDwy/B0azILpGkGIBnosJhhBhwIPcQfmsPs16L3Jw0PAds6x7ei7LwK9zGmiTLI1MnkQYc3yu0jzXHMPQOnWORgrdcN8QfCdT17RH7LlcqlZ043GjqLymyU9htNRoc07pTsL3XRTfg5bryQy5NucphwndNuwndJxYZIhOcmXuUx+E7ph+F7pOEjWSIhegnThO6CWMgyRzThnHimNLjBM3d4RYxuVqq7aopNqhkgGx3ae4Istzhctw1MQyhTH+lvmpFR1JgJcxg1bw1tx3gXV3xJmFymMy/Eud+EEnoAtXgdUDUHAxzBUnCY5jrU2mOoAAUtxPT5pwhXZmc76ITKVQnb1U6nTDR36ph9UjdwHnZLFQ9iOoVEjDGcTjdPJVmOzVzQ17YLDIcZ2gW/ZJz3MhTLZAN4n8t+vS+lYzPM1LH6HAgNaYDvzTN+83+wpTnWi3Hx3sznEGY/Eq1Hcmn36+rnaR5Apjgqi6vinEmxc1k/qAI1E9gxp/7llWYt1V/w23L38rknYC2/O38rsHBHDxwzdVQQ8wAz9AN4cf1m5PSfMKFUi92X2dVLgDYknyA/wCD791z3iDEaW16p3DGsb5vIAt/+i2Od4rS5sCS9wa1v+QHc9rT3ICwPGuIHwzSF9VVk9SYdA/8gPVT8yKLUSpz3C6MPSbz0nb9TzE/+BPqstjXeC+4kH2/hb/PMG6s51NjdXw6LZNg0a4bLnGA0RJkkbrPZ5ltBoe99ZsCoZbSa6oSC5wAmWtnlZx5KvGyXItGeyjDOftsr2hw695u/QO4gf8AtdbThwUnYcFrHsaRYuDGmOsaj8kzWpsmBUdP+ZlvcOP0RLl2OHF9ROR8D0nEMNUvM6nRYfMX/wCV0fJOF6NCC1txzKgcD5NDfiOM6tiJ2HSbx6LYGB2VYK1bIckqdIjYpoAkmA265XxXxbqqmntT2J6nlC6fmJDmkbrhXFuXOa/bUA+Y3lsylPbSHB0m+xFGlq8bnWNwG2kbSSna2OoUxGlpNu/zKzWJxpLrQBYWttsqrE4o6r8uiqlS0TcjWVM4IuLC1hbdWuR8XPouBaSB0JJHqOXosKyp4QfL6oYquQIHVFCs73XqU8yoaZLXaXEOEEiBcbbeS4lmODdSqupnW5gMS5paRyloP7WK039OM/dSq6d4GoekT8pXW85ySnXpfEYAS4SDvv8AVT/CutM4xk7x8PS7pK3OR5TSqUmNeL7wfPsstmnD76VT8FTeSfC1kdBMBajJmw1p1Au6BzT+5XPgrLOWjY8O5U6hIZULmbtBMx2g2Kun1T0WTo1ah2fBHIESpjK9Ru+o+cz81aOlojJW9ly6sehTL6z/ANLvYqNhM4vB/wCVNOcQYLD98vNb/wBMV+EYfFdsw/RFVwlXt6mL9kvEcQtBADXE9CPqltz6nHieAejRJ+aNew36Kl4rAxoP1+iCtxmrjs0R3LR+yCVfo7/B/EYtrRLjb28kKVNr4Lx0IH0n5rI4LMG1B8Vzw4NgjnfkAo1Di+m2q4PqDUS6GzzA2A+/mn8gfGdCxOOp0m3IHQbLJ5jxI/4gbcbmGAuMDqTty5TdZs8QOrOJaZ/zGNIH399DZmYon4hJ8MFzon8ws0d3R7DpKTnbNR40lZ0RmFfBdULdhA6EdXc9/khgcQWO0PnS7Yn5rKcQcTPPwW0yWt3eR3kNk9Ab8pjorHJc1ovHwnaQBG1tLiJn3Mk9wqZKyeLrZH4/xZpaNPiYRLm8jTiHEnYRa+wkTYqLhXMNNpez4tG3ic15LDF2u0+Kn1/Sm+NIimx5dDHuGpvRw0me1wb2ssTlGYY3By84qgKQIB1MqPY8Hb/DpsMEi9uqjJfay0X9aN3lowlBxOCwrG1Hk3pse+oZN9Ln/hHf8I+l82g9lM1KpGqLNbdrZNgP1d3cz2hVuQ8T0qxYxmHnUR4/wscRuWsDnWH+Yj3sonHOfEa6bQSGhoAn8bjzn9It/wBp7LMvA47ZmeJOIPhuLtQLiNIi1gPwt6DeT59lS4CgMS/+5qGKYNGo4i5+LDqRawdTDS3kJJvBVVjsM6o81KtmdAPE88w0H8vnYAXGwV6yk8ClSALWsAe5omHVagDv9WkaG+bSeZWElFWUbbddEzMsWXl/KmHtc1g/CNDG3P6nGR4jcx0ACx2OH+BU6/i93NdI9mhX/EGJDQKbSNRJ9XN29NZaPNwCpM/cAysOngHmA1x+gRC20wnSRocozBuhoaZsAb2FuZNkdcy7wnV2A+nVYvL8O51P4kkNE7EN2tOo2Y3cFx52Ena5yjMmtaPivikTpboBAcREgavFUiRLiABIudkS4e0Jc3TO7cPOAw9OP0jzUHPMxqscNAEc5UfI8U00mmmfCBAj+eak16oO4uq+Ykf+rIgzppEFwHWVjc6ZFcmxa/nvY/RWmY5WHaj+o7D7so7qQp+Hduntb1WdvybpLwc04hynQ5xA08/Dt7FZ8Ya8ud/K6Zn+Ea5hg8rjc35rB18nqjlb6fdleMtEJR2Qqj7ADb+EKtMmHAjpB+qSGGSIMi0d+al4XKqzyBoIBO52CZk3fBeDa+m6p8NrfCGudJ1E9ugsuq8IVT8ANJsLDyXPssq0qNJlBu4iTsSecrd5VWDWgDaFFf1Zdr60Uf8AUSQyWua102JOme28H5rJcN1DqIfv1m5M3k91bf1RxZqMFNjS7m4MgvAnfSblVuU0wKbQLuAv1LjG/lf2KbQkzWYHFlrtREMbExubCJ6pT+JC2rYageW3/adioL3w2OYH1Vaykysx7DuPcdD2tCw7N0jftfRqhr4ueRsR2UzDAF+mxEbnqLQfRcpwWaVKbnUnu/AQ0XNwBuT1O6ucPxJogufaQATbna60pbMOGtG+x+TUqgcXDcASOXVYTM8MKVbSKkAQJIuOYHt7wrZ3FzdGsPBAs4E9N1DxeZ4XFUy0ugkSHA3abxP+VOVMUbQhuctAj4kwgsJiMFWY4ta5sDaSUFmma0TMFnNFrKdPXDg5upt+t/TdQs4wgNR9WmQRNxzEg3681c1f6fB/j0Gd5lzv2skYT+npFm/EJdIcJLQR6G6zaHsxVPOXNIaTYRMWki4n/KOQU93EbdBbE3Fpu7qtvg/6ZsJl9Mf6v3tf1Vng/wCm2HBGptOIFo59DYKlp9GdrswGDzhtQvbVe+Cbhp3kXAA3i9tt1HGLrvqf4AfptduxYDAiewC7Lg+CsM0DwNsdmtaBPsZV1h8moM/Cxo9P4j2TSYnPRzHDcP43GACo9zBuTeSTc3iPTa3NWuH/AKYahFXEvdvsA3mL3F9l0ltJo2HZHHQefJPAy5mBfwyME3VhWmrWOlgNQud4QDLWaRvYSTA94TGJ4Rr1zreXNLvEQ5kxP5bPJsF0cm/L75JJceh6Rb3SfGmNcjXg5hi+EfhXqCrXIFm0mtaI5Bzy6AOwIScbhakvc6kZk6KVOTa8GpUiG8ttRXTiz+fspv4A59hdYfEbXMcPrZXXDjVfSL6zoDGta4U2DdrRI8V7+YHmqzE8LYh7W/EBDLlxsHvc8tcdIPMxz2F+x75WwLHGS3eeduygYzK2GNwBAgRHzRjKOwyUtHCK+R4vWxsBlOQAxkkMbsXX/EQPzH/ZV+bEvfqNJzQ3wsbBhtNs6R53k9SSu7V8la6LaQJHreJjdQsRwyx0y0GQNpI7gmN7ozYYro5hwlxXUoH4bgTSEmYMsa1sm3MQD6roGE4lp1hqa4Edkz//ABrDIiLOBM8jYR7KrxPAzmWpvcCb+GTPQSR9ylkh0y5xmObpmd+X35fNZbNMW+QJkTq9gTf5J3EZDi2jTMhpBGruNje6r6uT4u86CCCJJjf3Ttewd+iIzOHOMu5kjyMCPvuowxReQT+Ei87zt9+iT/8AB4p0tLedi2YJ7TCg1sixIJ3HL17Lar2Yd+i0bhqbqgtaNxzNir8Vhp8Mdv8AdZGnlmKZEXHS+/orLB4bFBsw21rzcn6Idewjfo1GAw7QQ51yrqvnDabSSbATHOOyxYZitMHS3YbzE+W4TlLKqpcHVHTHOTt5R5qbaRvbKfiHN8TVqfFa0aD+EiBYC4dfdWOR57DgX9rn8QmYHfZaGhkcNII5TsYB5GPIoVOH6bxdnmR4b26BHyIPjZR53xBLZputdpcO9o7EQD3VdgM0d46ji4S0DUy8kaibd/CtE/gygJ/ES6QQC6PWbeqrX8DvZLadZ0fiLXR846J5xYsZFHRzMl2t7pkmJ5j/AIhS/wD5YQRI0nlA+SbxPBNYCzmxuAA437dFCHCeJa5s3GpsyItNyn9fYW10SMyqtGIcB+AvOpo5mTBhKzauBpFEkPgSAYMXuoD8nxBqGoQD4y6Jv4iTy80K+XYn4heG3I+QRS9iyfofaap33++6CAy7Fm8D5oktew/w9KUsKBO8dJt7J5tEAWA9kbZ5/JL0q9EbEfBaRcJWkQje8Rugx0oAINbEQiDQOQhKb2CLXeCgA+aWNtkgulGUAH+yIlJLeco27croAKPZE8dN+8oNbCFJ25ukAlovfkEk0gpCbc5A7GXRe31TbaUiY9IUlo9ErbZZodkJ1Dt7dE09guANtpk7qwneYTYANxKTiNMrKmBB5c7+Xqo7stZI8AABkSd+8BWwpmfwkT1KeFNZwN5GerZK0z4R6SodXImA3FukRfqtYWwIuU05pP5fdJwQKbMfUyVgktAE/dkk5JYEjktc7BzG0/RLOFERKz8ZrMxbsuAAsd9gEpuGubHbnyK1f9s2IiURwlz4RdZ+MeZm6NKSb8vObboNoeG95V4cGXCLAfNIo5Q3YyfNGLDJFMKRmRFrf7IMYCdhqnmrynl7QLCI5pP9kZNxBTwDMp6bWzMXHsip4VrpMAnurU4ETuSfknW4MAEAXRiwyRSPy0RYQfT5JupkrHASLjcHmr5zDHKQmW4M7udM8kYCyKd2UNmzWgdJKJX7aLQNka1gZzL1jglBwTIejt1XQRHA3mjciae6IlABlqNo6ph9Y9EYcSgKHXPCSXpIdCXrsgBM9EpqapOBKdLQkAchJaQkhpRlAA1SgShASm7bIATvzSmhJY9GEAKJRF/RJLUemEDCqP6BG13OEconi26QDReZS2t9U1qbMJ74sckAJJvACOLJsFzr7BL7SgYksNkp4ANygXCN0h1TtKVBYkVbxCUGlNhjiVIYO6Eh2MGhfdNVsM0XN46KXpBRPHRGIsiLQAO1kkMM7qQymUj4JBklKh2Mvwo1SSU4KdrBLqOACRSrynSFbGnNvsiSnOMoIAeGIBS2NBQQWkJiHgjYpTHuQQQAvV1SW1wgggAwZQdV5IIIADndEYdAQQQAn+5T1N0oIIQMDyUhryjQQITN08IQQQhsKo/om9ZKCCBBiUYZO6CCBhik0XQqO6IkECEU5hLp0wN0SCADFMJHxQDACCCTGOFyaaDO6CCYhwNASKtcBBBJjQyzF3RV6pKCCSG0EKXVCm4AoII8AOfFCJBBMR//2Q=="/> */}

                <CardContent>
                    <Typography className="text" >Identifiant :</Typography>
                    <Typography variant="body2" color="textSecondary" className="text">
                        {_id}
                    </Typography>
                    <Typography className="text" >Type :</Typography>
                    <Typography variant="body2" color="textSecondary" className="text">
                        {type}
                    </Typography>
                    <Typography className="text" >Email :</Typography>
                    <Typography variant="body2" color="textSecondary" className="text">
                        {email}
                    </Typography>
                    <Typography className="text" >Numéro :</Typography>
                    <Typography variant="body2" color="textSecondary" className="text">
                        {phone}
                    </Typography>
                    <Typography className="text" >Adresse :</Typography>
                    <Typography variant="body2" color="textSecondary" className="text">
                        {adress}
                    </Typography>
                </CardContent>
            </div>
            <CardActions disableSpacing>
                <CheckForTheLoggedAdmin/>

            </CardActions>
        </Card>
    );
}

UserCard.defaultProps = {
    showActions: true
};

UserCard.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    promoteToAdmin: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
    islikeclicked: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteUser, promoteToAdmin, depromoteToUser }
)(UserCard);