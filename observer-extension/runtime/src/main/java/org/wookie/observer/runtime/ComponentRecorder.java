package org.wookie.observer.runtime;

import io.quarkus.runtime.RuntimeValue;
import io.quarkus.runtime.annotations.Recorder;
import org.wookie.observer.runtime.config.QuarkusProfile;

@Recorder
public class ComponentRecorder {
    RuntimeValue<ObserverConfig> config;
    RuntimeValue<QuarkusConfig> appConfig;
    RuntimeValue<QuarkusProfile> profile;
    RecorderService recorder;

    public ComponentRecorder(RuntimeValue<ObserverConfig> config, RuntimeValue<QuarkusConfig> appConfig, RuntimeValue<QuarkusProfile> profile) {
        this.config = config;
        this.appConfig = appConfig;
        this.profile = profile;
    }


    public void registerComponent() {
        this.recorder = new RecorderService(config.getValue(), profile.getValue());
        recorder.registerComponent(appConfig.getValue().name());
    }

}