import {
    DirectionsCarOutlined as ModelsIcon,
    LocalCarWashOutlined as VersionsIcon,
    PaletteOutlined as ColorsIcon,
    AttachMoneyOutlined as PricingIcon,
    TrendingUpOutlined as StockIcon,
    TuneOutlined as OptionsIcon,
    VideoLibraryOutlined as VideosIcon,
    PhotoLibraryOutlined as ImagesIcon,
    MonetizationOnOutlined as SimulatorIcon,
    // HomeOutlined as HomeIcon,
    ShoppingCartOutlined as OrdersIcon,
} from "@material-ui/icons";
import Models from '../views/dashboard/models';
import Versions from '../views/dashboard/versions';
import Options from '../views/dashboard/options';
import Colors from '../views/dashboard/colors';
import Videos from '../views/dashboard/videos';
import Images from '../views/dashboard/images';
import Pricing from '../views/dashboard/pricing';
import Stock from '../views/dashboard/stock';
import Orders from '../views/dashboard/orders';
import Simulator from '../views/dashboard/simulation';
// import Home from '../views/dashboard/home';

export default {
    // home: {
    //     label: 'Accueil',
    //     icon: HomeIcon,
    //     component: Home,
    // },
    orders: {
        label: 'Commandes',
        icon: OrdersIcon,
        component: Orders,
    },
    stock: {
        label: 'Stock',
        icon: StockIcon,
        component: Stock,
    },
    pricing: {
        label: 'Tarification',
        icon: PricingIcon,
        component: Pricing,
    },
    models: {
        label: 'Modèles',
        icon: ModelsIcon,
        component: Models,
    },
    versions: {
        label: 'Versions',
        icon: VersionsIcon,
        component: Versions,
    },
    images: {
        label: 'Images',
        icon: ImagesIcon,
        component: Images,
    },
    videos: {
        label: 'Videos',
        icon: VideosIcon,
        component: Videos,
    },
    colors: {
        label: 'Couleurs',
        icon: ColorsIcon,
        component: Colors,
    },
    options: {
        label: 'Options',
        icon: OptionsIcon,
        component: Options,
    },
    simulation: {
        label: 'Simulation du prix',
        icon: SimulatorIcon,
        component: Simulator,
    },
};
