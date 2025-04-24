import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"
import cottage_image from "./cottage.jpg"
import chapel_image from "./chapel.jpg"
import farm_image from "./farm.jpg"
import tavern_image from "./tavern.jpg"
import well_image from "./well.webp"
import theater_image from "./theater.jpg"
import factory_image from "./factory.jpg"
import monument_image from "./monument.jpg"

function Cottage() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Cottage</div>
                <div className="cottage_piece"></div>
            </div>
            <img src={cottage_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wheat" style={{gridArea: "2/3"}}></div>
                    <div className="brick" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">3 points if this building is fed.</div>
        </div>
    );
}

function Chapel() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Chapel</div>
                <div className="chapel_piece"></div>
            </div>
            <img src={chapel_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="six">
                    <div className="glass" style={{gridArea: "2/4"}}></div>
                    <div className="stone" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                    <div className="stone" style={{gridArea: "3/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">1 point for each fed cottage.</div>
        </div>
    );
}

function Farm() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Farm</div>
                <div className="farm_piece"></div>
            </div>
            <img src={farm_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="wood" style={{gridArea: "2/3"}}></div>
                    <div className="wheat" style={{gridArea: "3/2"}}></div>
                    <div className="wheat" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">Feds 4 buildings anywhere in your town.</div>
        </div>
    );
}

function Tavern() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Tavern</div>
                <div className="tavern_piece"></div>
            </div>
            <img src={tavern_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="three">
                    <div className="brick" style={{gridArea: "2/2"}}></div>
                    <div className="brick" style={{gridArea: "2/3"}}></div>
                    <div className="glass" style={{gridArea: "2/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">Points based on your constructed taverns.</div>
        </div>
    );
}

function Well() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Well</div>
                <div className="well_piece"></div>
            </div>
            <img src={well_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="two">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="stone" style={{gridArea: "2/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">1 point for each adjacent chapel.</div>
        </div>
    );
}

function Theater() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Theater</div>
                <div className="theater_piece"></div>
            </div>
            <img src={theater_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="six">
                    <div className="stone" style={{gridArea: "2/3"}}></div>
                    <div className="wood" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                    <div className="wood" style={{gridArea: "3/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">1 point for each other unqiue building in the same row and column as this building.</div>
        </div>
    );
}

function Factory() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Factory</div>
                <div className="factory_piece"></div>
            </div>
            <img src={factory_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="eight">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="brick" style={{gridArea: "3/2"}}></div>
                    <div className="stone" style={{gridArea: "3/3"}}></div>
                    <div className="stone" style={{gridArea: "3/4"}}></div>
                    <div className="brick" style={{gridArea: "3/5"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom factory_description">When constructed, place 1 of the 5 resources on this building. When this resources appears in the draw, you may choose any other resource.</div>
        </div>
    );
}

function Monument() {
    return(
        <div className="building_card">
            <div className="building_name">
                <div>Cathedral of Caterina</div>
                <div className="monument_piece"></div>
            </div>
            <img src={monument_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wheat" style={{gridArea: "2/3"}}></div>
                    <div className="stone" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">2 points. Empty squares in your town are worth 0 points (instead of -1 point).</div>
        </div>
    );
}

function Square({children}) {
    return(
        <div className="square">
            {children}
        </div>
    );
}

function ResourceCard({resource}) {
    return(
        <div className="resource_card">
            <div className="resource_card_name">{resource}</div>
            <div className="resource_card_middle">
                <div className={`center_piece ${resource}`}></div>
            </div>
            <div className="resource_Card_bottom"></div>
        </div>
    );
}

function Game() {
    return(
        <div className="main">
            <div className="building_cards">
                <Cottage></Cottage>
                <Chapel></Chapel>
                <Farm></Farm>
                <Tavern></Tavern>
                <Well></Well>
                <Theater></Theater>
                <Factory></Factory>
            </div>
            <div className="bottom">
                <div className="resource_area">
                    <div></div>
                    <div className="resource_cards">
                        <ResourceCard resource={"Brick"}></ResourceCard>
                        <ResourceCard resource={"Glass"}></ResourceCard>
                        <ResourceCard resource={"Stone"}></ResourceCard>
                    </div>
                </div>
                <div className="board">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                </div>
                <div className="right">
                    <div className="monument_area">
                        <div></div>
                        <Monument></Monument>
                    </div>
                    <div className="button_area">
                        <div></div>
                        <div className="complete_town">Complete Town</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("game"));
root.render(<Game />);

export function add(x, y) {
    return x + y;
}
