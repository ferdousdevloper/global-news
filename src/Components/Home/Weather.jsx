
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const Weather = () => {
    return (
        <div className="container mx-auto my-10" style={{ width: '85%' }}>
            <div className="flex items-center justify-between p-6 bg-gray-200">
                <div>
                    <h2 className="text-3xl font-medium">Your briefing</h2>
                    <p className="pt-3">Wednesday, September 25</p>
                </div>

                <div className="flex items-center justify-center gap-3 p-6 bg-gray-100">
                    <div>
                        <p><MdSunny className="text-5xl" /></p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-3">
                            <h2>Dhaka City</h2>
                            <p><FaLocationCrosshairs /></p>
                        </div>
                        <h1 className="text-3xl">30°C</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
