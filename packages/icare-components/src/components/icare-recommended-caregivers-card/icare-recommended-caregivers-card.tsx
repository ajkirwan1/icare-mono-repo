import { Component, Host, h, State, Event, EventEmitter } from "@stencil/core";

@Component({
    tag: "icare-recommended-caregivers-card",
    styleUrl: "icare-recommended-caregivers-card.scss",
    shadow: true
})
export class IcareRecommendedCaregiversCard {

    @State() fetchResult: {
        status: "loading" | "success" | "error";
        data?: {
            imgSrc: string;
            imgAlt?: string;
            name?: string;
            bio?: string;
            profileId?: string;
            id?: string;
        }[];
        error?: any;
    } = { status: "loading" };

    @Event() navigate: EventEmitter<string>;

    componentWillLoad() {
        fetch("/api/recommended-caregivers")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.fetchResult = { status: "success", data };
            }
            ).catch(error => {
                // eslint-disable-next-line no-console
                console.error("Error fetching messages:", error);
                this.fetchResult = { status: "error", error };
            }
            );
    }

    private goToAllCaregivers = (e: MouseEvent) => {
        e.preventDefault();
        this.navigate.emit("caregivers");
    };

    private goToSavedCaregivers = (e: MouseEvent) => {
        e.preventDefault();
        this.navigate.emit("caregivers/saved");
    };

    render() {
        const { status, data } = this.fetchResult;
        return (
            <Host
            >
                <icare-card>
                    <span slot="contents">
                        <div class="header">
                            <h2>Recommended Caregivers</h2>
                            <p>Based on your preferences and requirements, we have identified the following caregivers that to suite your requirements</p>
                        </div>
                        {status === "loading" && <p>Loading…</p>}
                        {status === "error" && <p>Error loading caregivers.</p>}
                        {status === "success" && (
                            <div class="caregiver-list">
                                {data.map((c, i) => (
                                    <icare-caregiver-mini-profile-card
                                        key={c.profileId ?? c.name ?? i}
                                        imgSrc={c.imgSrc}
                                        imgAlt={c.imgAlt}
                                        name={c.name}
                                        id={c.id}
                                        bio={c.bio}
                                    />
                                ))}
                            </div>
                        )}
                        <div class="card-footer">
                            <ul>
                                <li>
                                    <span>
                                        <a href="#" onClick={this.goToAllCaregivers}>
                                            View all caregivers
                                        </a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <a href="#" onClick={this.goToSavedCaregivers}>
                                            Saved caregivers
                                        </a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </span>
                </icare-card>
            </Host >
        );
    }
}
